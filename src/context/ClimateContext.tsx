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
        if (parsed.profile) setProfileState({ ...defaultProfile, ...parsed.profile });
        if (parsed.budget !== undefined) setBudgetState(Number(parsed.budget));
        if (parsed.selectedBundleId) setSelectedBundleIdState(parsed.selectedBundleId);
        if (parsed.operatingHours !== undefined) setOperatingHoursState(Number(parsed.operatingHours));
        if (parsed.electricityCost !== undefined) setElectricityCostState(Number(parsed.electricityCost));
      } else {
        // Also sync legacy msme_climate_profile key if present
        const legacyProfile = localStorage.getItem('msme_climate_profile');
        if (legacyProfile) {
          const parsed = JSON.parse(legacyProfile);
          setProfileState({ ...defaultProfile, ...parsed });
          if (parsed.availableBudgetINR) setBudgetState(Number(parsed.availableBudgetINR));
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
    setProfileState(defaultProfile);
    setBudgetState(300000);
    setSelectedBundleIdState('bundle-b');
    setOperatingHoursState(10);
    setElectricityCostState(78000);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('msme_climate_profile', JSON.stringify(defaultProfile));
  };

  const bundles = getBundlesForBudget(budget);
  const activeBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[0];
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
