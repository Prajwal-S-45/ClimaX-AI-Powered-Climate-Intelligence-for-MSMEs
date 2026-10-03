import { OnboardingFormData } from '../types';

export interface InterventionItem {
  id: string;
  name: string;
  category: 'Energy' | 'Water' | 'Heat' | 'Transport' | 'Waste';
  estimatedInvestment: number;
  annualSavings: number;
  co2Reduction: number; // tCO2e/yr
  waterSavings: number; // Litres/yr
  riskCategories: string[];
  paybackYears: number;
  complexity: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface InterventionBundle {
  id: string;
  title: string;
  subtitle: string;
  items: InterventionItem[];
  tag: string;
  metrics: {
    totalInvestment: number;
    annualSavings: number;
    co2Reduction: number;
    waterSavings: number;
    avgPayback: number;
    risks: string[];
  };
}

export const defaultProfile: OnboardingFormData = {
  businessName: 'Shakti Precision Components',
  businessType: 'Private Limited',
  industry: 'Manufacturing',
  location: 'Bengaluru, Karnataka',
  yearsOperating: 8,
  numberOfEmployees: 28,
  monthlyElectricityBillINR: 78000,
  monthlyWaterConsumptionLitres: 85000,
  monthlyFuelExpenseINR: 22000,
  operatingHoursPerDay: 10,
  workingDaysPerMonth: 26,
  climateConcerns: ['Extreme heat', 'Rising energy costs', 'Water scarcity'],
  availableBudgetINR: 300000,
  preferredHorizonYears: 5,
  maxPaybackPeriodYears: 4,
};

export const interventionDatabase: InterventionItem[] = [
  {
    id: 'led-retrofit',
    name: 'LED Lighting Retrofit & Smart Controls',
    category: 'Energy',
    estimatedInvestment: 65000,
    annualSavings: 38000,
    co2Reduction: 4.8,
    waterSavings: 0,
    riskCategories: ['Energy Vulnerability'],
    paybackYears: 1.7,
    complexity: 'Low',
    description: 'High-bay LED fixture replacement with motion sensors and daylight harvesting dimmers.',
  },
  {
    id: 'cool-roof',
    name: 'Cool Roof Thermal Reflective Coating',
    category: 'Heat',
    estimatedInvestment: 35000,
    annualSavings: 24000,
    co2Reduction: 3.2,
    waterSavings: 0,
    riskCategories: ['Extreme Heat', 'Energy Vulnerability'],
    paybackYears: 1.5,
    complexity: 'Low',
    description: 'High-SRI elastomeric reflective roof coating reducing workshop ambient temperature by 4–6°C.',
  },
  {
    id: 'ie4-motors',
    name: 'IE4 Super-Premium Efficiency Motors',
    category: 'Energy',
    estimatedInvestment: 120000,
    annualSavings: 82000,
    co2Reduction: 12.5,
    waterSavings: 0,
    riskCategories: ['Energy Vulnerability'],
    paybackYears: 1.5,
    complexity: 'Medium',
    description: 'Direct drive IE4 efficiency motor replacements for workshop air compressors and CNC pumps.',
  },
  {
    id: 'water-fixtures',
    name: 'Water-Efficient Fixtures & Aerators',
    category: 'Water',
    estimatedInvestment: 25000,
    annualSavings: 18000,
    co2Reduction: 0.8,
    waterSavings: 120000,
    riskCategories: ['Water Stress'],
    paybackYears: 1.4,
    complexity: 'Low',
    description: 'Sensor faucets, low-flow aerators, and pressure-regulating valves across facility restrooms.',
  },
  {
    id: 'rainwater-harvesting',
    name: 'Rainwater Harvesting & Storage System',
    category: 'Water',
    estimatedInvestment: 140000,
    annualSavings: 72000,
    co2Reduction: 2.1,
    waterSavings: 280000,
    riskCategories: ['Water Stress', 'Flood Exposure'],
    paybackYears: 1.9,
    complexity: 'Medium',
    description: 'Rooftop rainwater collection channels, multi-stage filtration unit, and 50,000L storage tank.',
  },
  {
    id: 'waste-heat-recovery',
    name: 'Waste Heat & Metal Scrap Recovery',
    category: 'Waste',
    estimatedInvestment: 80000,
    annualSavings: 45000,
    co2Reduction: 3.5,
    waterSavings: 0,
    riskCategories: ['Extreme Heat', 'Energy Vulnerability'],
    paybackYears: 1.8,
    complexity: 'Medium',
    description: 'Compressor exhaust heat exchanger for pre-heating process water and oil recycling.',
  },
  {
    id: 'solar-rooftop-starter',
    name: 'Solar Rooftop System (15 kWp Grid-Tied)',
    category: 'Energy',
    estimatedInvestment: 260000,
    annualSavings: 145000,
    co2Reduction: 18.5,
    waterSavings: 0,
    riskCategories: ['Energy Vulnerability'],
    paybackYears: 1.8,
    complexity: 'High',
    description: '15 kWp grid-tied solar PV array with net-metering to offset DISCOM peak electricity charges.',
  },
  {
    id: 'ev-delivery-trike',
    name: 'EV Commercial Delivery Trike',
    category: 'Transport',
    estimatedInvestment: 180000,
    annualSavings: 68000,
    co2Reduction: 6.8,
    waterSavings: 0,
    riskCategories: ['Energy Vulnerability'],
    paybackYears: 2.6,
    complexity: 'Medium',
    description: 'Electric 3-wheeler cargo vehicle for local supplier parts dispatch, eliminating diesel fuel costs.',
  },
];

// Central Baseline Emissions Calculation Model
export const getBaselineEmissions = (profileData: OnboardingFormData = defaultProfile) => {
  const electricityCost = Number(profileData.monthlyElectricityBillINR) || 78000;
  const fuelExpense = Number(profileData.monthlyFuelExpenseINR) || 22000;

  // Scope 2 (Electricity): ~8,210 kWh/mo * 0.82 kg CO2/kWh = 6.73 tCO2e/mo
  const monthlyScope2 = Number(((electricityCost / 9.5) * 0.82 / 1000).toFixed(2));

  // Scope 1 (Diesel Fuel): ~231 L/mo * 2.68 kg CO2/L = 0.62 tCO2e/mo + direct process
  const monthlyScope1 = Number(((fuelExpense / 95) * 2.68 / 1000 + 6.85).toFixed(2)); // Total 14.2 tCO2e/mo Scope 1 & 2 baseline

  const monthlyTotalCO2 = Number((monthlyScope1 + monthlyScope2).toFixed(1)); // 14.2 tCO2e/mo
  const annualTotalCO2 = Number((monthlyTotalCO2 * 12).toFixed(1)); // 170.4 tCO2e/yr

  return {
    monthlyScope1,
    monthlyScope2,
    monthlyTotalCO2,
    annualTotalCO2,
  };
};

export const getBundlesForBudget = (currentBudget: number): InterventionBundle[] => {
  // Bundle A: Energy Efficiency Starter
  const bundleAItems = [
    interventionDatabase.find((i) => i.id === 'led-retrofit')!,
    interventionDatabase.find((i) => i.id === 'cool-roof')!,
  ];

  // Bundle B: Balanced Climate Plan
  const bundleBItems = [
    interventionDatabase.find((i) => i.id === 'led-retrofit')!,
    interventionDatabase.find((i) => i.id === 'cool-roof')!,
    interventionDatabase.find((i) => i.id === 'ie4-motors')!,
  ];

  // Bundle C: High-Impact Resilience Plan
  const bundleCItems = [
    interventionDatabase.find((i) => i.id === 'solar-rooftop-starter')!,
    interventionDatabase.find((i) => i.id === 'led-retrofit')!,
  ];

  const computeMetrics = (items: InterventionItem[]) => {
    const totalInvestment = items.reduce((acc, i) => acc + i.estimatedInvestment, 0);
    const annualSavings = items.reduce((acc, i) => acc + i.annualSavings, 0);
    const co2Reduction = Number(items.reduce((acc, i) => acc + i.co2Reduction, 0).toFixed(1));
    const waterSavings = items.reduce((acc, i) => acc + i.waterSavings, 0);
    const avgPayback = annualSavings > 0 ? Number((totalInvestment / annualSavings).toFixed(1)) : 0;
    const risks = Array.from(new Set(items.flatMap((i) => i.riskCategories)));
    return { totalInvestment, annualSavings, co2Reduction, waterSavings, avgPayback, risks };
  };

  return [
    {
      id: 'bundle-a',
      title: 'Energy Efficiency Starter',
      subtitle: 'Fast payback, low risk operational quick-wins',
      items: bundleAItems,
      metrics: computeMetrics(bundleAItems),
      tag: 'Quick Payback',
    },
    {
      id: 'bundle-b',
      title: 'Balanced Climate Plan',
      subtitle: 'Multi-hazard resilience combining heat, power & water savings',
      items: bundleBItems,
      metrics: computeMetrics(bundleBItems),
      tag: 'Recommended Plan',
    },
    {
      id: 'bundle-c',
      title: 'High-Impact Resilience Plan',
      subtitle: 'Maximized long-term carbon reduction and renewable energy offset',
      items: bundleCItems,
      metrics: computeMetrics(bundleCItems),
      tag: 'Deep Decarbonization',
    },
  ];
};
