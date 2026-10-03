import { MSMEProfile, ClimateRiskItem, Intervention } from '../types';

export const mockMSMEProfile: MSMEProfile = {
  id: 'msme-101',
  businessName: 'Apex Precision Engineering Solutions',
  sector: 'Auto Components Manufacturing',
  state: 'Tamil Nadu',
  city: 'Coimbatore',
  employeeCount: 45,
  annualTurnoverINR: 35000000,
  primaryEnergySource: 'Grid Electricity + Diesel Generator',
};

export const mockClimateRisks: ClimateRiskItem[] = [
  {
    id: 'risk-1',
    category: 'Physical',
    riskTitle: 'Urban Flooding & Monsoon Disruptions',
    severity: 'High',
    financialImpactScore: 78,
    description: 'Heavy precipitation during North-East monsoon leading to workshop submergence and equipment downtime.',
  },
  {
    id: 'risk-2',
    category: 'Transition',
    riskTitle: 'Carbon Border Tax (CBAM) Export Exposure',
    severity: 'Critical',
    financialImpactScore: 88,
    description: 'Tier-1 OEM buyers demanding Scope 1 & Scope 2 footprint compliance for EU export market.',
  },
  {
    id: 'risk-3',
    category: 'Supply Chain',
    riskTitle: 'Water Scarcity & Industrial Water Cost Surge',
    severity: 'Medium',
    financialImpactScore: 55,
    description: 'Depleting groundwater table increasing dependence on private water tankers during summer months.',
  },
];

export const mockInterventions: Intervention[] = [
  {
    id: 'int-1',
    title: 'Rooftop Solar PV Installation (50 kWp)',
    category: 'Renewable Energy',
    estimatedCostINR: 2200000,
    annualSavingsINR: 540000,
    co2ReductionTonsPerYear: 62,
    paybackPeriodYears: 4.1,
    implementationTimeWeeks: 6,
    selected: true,
  },
  {
    id: 'int-2',
    title: 'IE4 Super-Premium Efficiency Motors',
    category: 'Energy Efficiency',
    estimatedCostINR: 450000,
    annualSavingsINR: 135000,
    co2ReductionTonsPerYear: 18,
    paybackPeriodYears: 3.3,
    implementationTimeWeeks: 2,
    selected: true,
  },
  {
    id: 'int-3',
    title: 'Rainwater Harvesting & Effluent Reuse System',
    category: 'Water Conservation',
    estimatedCostINR: 650000,
    annualSavingsINR: 180000,
    co2ReductionTonsPerYear: 8,
    paybackPeriodYears: 3.6,
    implementationTimeWeeks: 4,
    selected: false,
  },
];
