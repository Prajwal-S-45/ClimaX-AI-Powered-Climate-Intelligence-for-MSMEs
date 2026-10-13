// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { ClimateProvider, useClimate } from './ClimateContext';

const STORAGE_KEY = 'msme_climate_app_state';
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ClimateProvider>{children}</ClimateProvider>
);

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

describe('ClimateContext state and persistence', () => {
  it('starts with the documented demo defaults when storage is empty', async () => {
    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => expect(result.current.budget).toBe(100000));
    expect(result.current.selectedBundleId).toBe('bundle-a');
    expect(result.current.profile.availableBudgetINR).toBe(100000);
  });

  it('restores a ₹3,00,000 budget and the Balanced Climate Plan selection', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      budget: 300000,
      selectedBundleId: 'bundle-b',
      profile: { businessName: 'Shakti Precision Components' },
    }));

    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => {
      expect(result.current.budget).toBe(300000);
      expect(result.current.selectedBundleId).toBe('bundle-b');
    });
    expect(result.current.profile.availableBudgetINR).toBe(300000);
    expect(result.current.activeBundle.id).toBe('bundle-b');
    expect(result.current.activeBundle.isFeasible).toBe(true);
  });

  it('persists a changed budget and keeps profile budget in sync', async () => {
    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => expect(result.current.budget).toBe(100000));

    act(() => result.current.setBudget(300000));
    expect(result.current.budget).toBe(300000);
    expect(result.current.profile.availableBudgetINR).toBe(300000);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(saved.budget).toBe(300000);
    expect(saved.profile.availableBudgetINR).toBe(300000);
  });

  it('falls back to a feasible bundle when the budget is reduced', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      budget: 300000,
      selectedBundleId: 'bundle-b',
    }));
    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => expect(result.current.activeBundle.id).toBe('bundle-b'));

    act(() => result.current.setBudget(100000));
    await waitFor(() => expect(result.current.selectedBundleId).toBe('bundle-a'));
    expect(result.current.activeBundle.isFeasible).toBe(true);
    expect(result.current.activeBundle.metrics.totalInvestment).toBeLessThanOrEqual(100000);
  });

  it('persists a feasible bundle selection and operating inputs', async () => {
    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => expect(result.current.budget).toBe(100000));

    act(() => result.current.setBudget(300000));
    act(() => {
      result.current.setSelectedBundleId('bundle-b');
      result.current.setOperatingHours(12);
      result.current.setElectricityCost(82000);
    });

    await waitFor(() => expect(result.current.selectedBundleId).toBe('bundle-b'));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(saved.selectedBundleId).toBe('bundle-b');
    expect(saved.operatingHours).toBe(12);
    expect(saved.electricityCost).toBe(82000);
  });

  it('reset restores defaults and clears the current state record', async () => {
    const { result } = renderHook(() => useClimate(), { wrapper });
    await waitFor(() => expect(result.current.budget).toBe(100000));
    act(() => result.current.setBudget(300000));
    act(() => result.current.resetToDefaults());

    expect(result.current.budget).toBe(100000);
    expect(result.current.selectedBundleId).toBe('bundle-a');
    expect(result.current.profile.availableBudgetINR).toBe(100000);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(JSON.parse(localStorage.getItem('msme_climate_profile') || '{}').availableBudgetINR).toBe(100000);
  });
});
