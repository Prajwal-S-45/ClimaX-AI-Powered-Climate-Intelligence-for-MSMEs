import React, { createContext, useContext, useState, useEffect } from 'react';
import { OnboardingFormData } from '../types';
import {
  defaultProfile,
  getBundlesForBudget,
  getBaselineEmissions,
  InterventionBundle,
} from '../utils/climateEngine';

interface ClimateContextType {
  profile: OnboardingFormData;
  updateProfile: (data: Partial<OnboardingFormData>) => void;
  budget: number;
  setBudget: (budget: number) => void;
  selectedBundleId: string;
  setSelectedBundleId: (bundleId: string) => void;
  operatingHours: number;
  setOperatingHours: (hours: number) => void;
  electricityCost: number;
  setElectricityCost: (cost: number) => void;
  bundles: InterventionBundle[];
  activeBundle: InterventionBundle;
  baselineEmissions: ReturnType<typeof getBaselineEmissions>;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'msme_climate_app_state';

const ClimateContext = createContext<ClimateContextType | undefined>(undefined);

export const ClimateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<OnboardingFormData>(defaultProfile);
  const [budget, setBudgetState] = useState<number>(100000);
  const [selectedBundleId, setSelectedBundleIdState] = useState<string>('bundle-a');
  const [operatingHours, setOperatingHoursState] = useState<number>(10);
  const [electricityCost, setElectricityCostState] = useState<number>(78000);

  // Initialize state from localStorage or default
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validBudget = (parsed.budget && parsed.budget !== 300000) ? Number(parsed.budget) : 100000;
        const validBundleId = (parsed.selectedBundleId && parsed.selectedBundleId !== 'bundle-b') ? parsed.selectedBundleId : 'bundle-a';

        if (parsed.profile) setProfileState({ ...defaultProfile, ...parsed.profile, availableBudgetINR: validBudget });
        setBudgetState(validBudget);
        setSelectedBundleIdState(validBundleId);
        if (parsed.operatingHours !== undefined) setOperatingHoursState(Number(parsed.operatingHours));
        if (parsed.electricityCost !== undefined) setElectricityCostState(Number(parsed.electricityCost));
      } else {
        // Also sync legacy msme_climate_profile key if present
        const legacyProfile = localStorage.getItem('msme_climate_profile');
        if (legacyProfile) {
          const parsed = JSON.parse(legacyProfile);
          const validBudget = (parsed.availableBudgetINR && parsed.availableBudgetINR !== 300000) ? Number(parsed.availableBudgetINR) : 100000;
          setProfileState({ ...defaultProfile, ...parsed, availableBudgetINR: validBudget });
          setBudgetState(validBudget);
          setSelectedBundleIdState('bundle-a');
        } else {
          setProfileState({ ...defaultProfile, availableBudgetINR: 100000 });
          setBudgetState(100000);
          setSelectedBundleIdState('bundle-a');
        }
      }
    } catch (e) {
      console.error('Error loading saved ClimateContext state:', e);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (newState: Record<string, any>) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const updated = { ...existing, ...newState };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Sync profile key for legacy support
      if (newState.profile) {
        localStorage.setItem('msme_climate_profile', JSON.stringify(newState.profile));
      }
    } catch (e) {
      console.error('Error saving ClimateContext state:', e);
    }
  };

  const updateProfile = (data: Partial<OnboardingFormData>) => {
    const updated = { ...profile, ...data };
    setProfileState(updated);
    if (data.availableBudgetINR !== undefined) {
      setBudgetState(Number(data.availableBudgetINR));
    }
    if (data.monthlyElectricityBillINR !== undefined) {
      setElectricityCostState(Number(data.monthlyElectricityBillINR));
    }
    if (data.operatingHoursPerDay !== undefined) {
      setOperatingHoursState(Number(data.operatingHoursPerDay));
    }
    saveState({ profile: updated, budget: updated.availableBudgetINR || budget });
  };

  const setBudget = (newBudget: number) => {
    setBudgetState(newBudget);
    saveState({ budget: newBudget });
  };

  const setSelectedBundleId = (bundleId: string) => {
    setSelectedBundleIdState(bundleId);
    saveState({ selectedBundleId: bundleId });
  };

  const setOperatingHours = (hours: number) => {
    setOperatingHoursState(hours);
    saveState({ operatingHours: hours });
  };

  const setElectricityCost = (cost: number) => {
    setElectricityCostState(cost);
    saveState({ electricityCost: cost });
  };

  const resetToDefaults = () => {
    const resetProfile = { ...defaultProfile, availableBudgetINR: 100000 };
    setProfileState(resetProfile);
    setBudgetState(100000);
    setSelectedBundleIdState('bundle-a');
    setOperatingHoursState(10);
    setElectricityCostState(78000);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('msme_climate_profile', JSON.stringify(resetProfile));
  };

  const bundles = getBundlesForBudget(budget);

  // Auto-fallback: If selected bundle becomes over-budget, switch to best feasible bundle
  useEffect(() => {
    const currentSelected = bundles.find((b) => b.id === selectedBundleId);
    if (currentSelected && !currentSelected.isFeasible) {
      const feasibleBundles = bundles.filter((b) => b.isFeasible);
      const fallbackBundle = feasibleBundles.length > 0
        ? feasibleBundles[feasibleBundles.length - 1]
        : bundles[0];
      setSelectedBundleIdState(fallbackBundle.id);
      saveState({ selectedBundleId: fallbackBundle.id });
    }
  }, [budget, selectedBundleId]);

  const activeBundle =
    bundles.find((b) => b.id === selectedBundleId && b.isFeasible) ||
    bundles.find((b) => b.isFeasible) ||
    bundles[0];
  const baselineEmissions = getBaselineEmissions(profile);

  return (
    <ClimateContext.Provider
      value={{
        profile,
        updateProfile,
        budget,
        setBudget,
        selectedBundleId,
        setSelectedBundleId,
        operatingHours,
        setOperatingHours,
        electricityCost,
        setElectricityCost,
        bundles,
        activeBundle,
        baselineEmissions,
        resetToDefaults,
      }}
    >
      {children}
    </ClimateContext.Provider>
  );
};

export const useClimate = () => {
  const context = useContext(ClimateContext);
  if (!context) {
    throw new Error('useClimate must be used within a ClimateProvider');
  }
  return context;
};
