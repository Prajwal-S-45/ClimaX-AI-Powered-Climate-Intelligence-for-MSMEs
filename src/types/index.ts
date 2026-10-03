export interface MSMEProfile {
  id: string;
  businessName: string;
  sector: string;
  state: string;
  city: string;
  employeeCount: number;
  annualTurnoverINR: number;
  primaryEnergySource: string;
}

export interface ClimateRiskItem {
  id: string;
  category: 'Physical' | 'Transition' | 'Regulatory' | 'Supply Chain';
  riskTitle: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  financialImpactScore: number; // 1-100
  description: string;
}

export interface Intervention {
  id: string;
  title: string;
  category: string;
  estimatedCostINR: number;
  annualSavingsINR: number;
  co2ReductionTonsPerYear: number;
  paybackPeriodYears: number;
  implementationTimeWeeks: number;
  selected?: boolean;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
}
