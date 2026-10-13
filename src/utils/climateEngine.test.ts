import { describe, expect, it } from 'vitest';
import {
  defaultProfile,
  getBaselineEmissions,
  getBundlesForBudget,
} from './climateEngine';

describe('getBaselineEmissions', () => {
  it('returns finite non-negative values for the default profile', () => {
    const result = getBaselineEmissions(defaultProfile);

    expect(result.monthlyScope1).toBeGreaterThanOrEqual(0);
    expect(result.monthlyScope2).toBeGreaterThanOrEqual(0);
    expect(result.monthlyTotalCO2).toBeGreaterThan(0);
    expect(result.annualTotalCO2).toBeCloseTo(result.monthlyTotalCO2 * 12, 1);
    Object.values(result).forEach((value) => expect(Number.isFinite(value)).toBe(true));
  });

  it('uses zero electricity and fuel costs without replacing them with defaults', () => {
    const result = getBaselineEmissions({
      ...defaultProfile,
      monthlyElectricityBillINR: 0,
      monthlyFuelExpenseINR: 0,
    });

    expect(result.monthlyScope2).toBe(0);
    // Manufacturing process emissions remain part of the current model.
    expect(result.monthlyScope1).toBe(6.85);
  });

  it('uses the default profile when cost values are missing or invalid', () => {
    const baseline = getBaselineEmissions(defaultProfile);
    const result = getBaselineEmissions({
      ...defaultProfile,
      monthlyElectricityBillINR: '' as unknown as number,
      monthlyFuelExpenseINR: -1,
    });

    expect(result.monthlyScope2).toBe(baseline.monthlyScope2);
    expect(result.monthlyScope1).toBe(baseline.monthlyScope1);
  });

  it('does not add manufacturing process emissions for a non-industrial profile', () => {
    const result = getBaselineEmissions({ ...defaultProfile, industry: 'Retail' });
    expect(result.monthlyScope1).toBeCloseTo((22000 / 95) * 2.68 / 1000, 2);
  });
});

describe('getBundlesForBudget', () => {
  it('returns all three bundle options', () => {
    expect(getBundlesForBudget(100000)).toHaveLength(3);
  });

  it('marks bundles feasible only when their investment fits the budget', () => {
    const budget = 100000;
    const bundles = getBundlesForBudget(budget);

    bundles.forEach((bundle) => {
      expect(bundle.isFeasible).toBe(bundle.metrics.totalInvestment <= budget);
      expect(bundle.amountOverBudget).toBe(Math.max(0, bundle.metrics.totalInvestment - budget));
    });
  });

  it('keeps the starter bundle within a ₹1,00,000 budget', () => {
    const starter = getBundlesForBudget(100000).find((bundle) => bundle.id === 'bundle-a');
    expect(starter).toBeDefined();
    expect(starter!.isFeasible).toBe(true);
    expect(starter!.metrics.totalInvestment).toBe(100000);
  });

  it('makes the balanced plan feasible at ₹3,00,000 but not at ₹1,00,000', () => {
    const lowBudget = getBundlesForBudget(100000).find((bundle) => bundle.id === 'bundle-b');
    const highBudget = getBundlesForBudget(300000).find((bundle) => bundle.id === 'bundle-b');

    expect(lowBudget!.isFeasible).toBe(false);
    expect(highBudget!.isFeasible).toBe(true);
  });
});
