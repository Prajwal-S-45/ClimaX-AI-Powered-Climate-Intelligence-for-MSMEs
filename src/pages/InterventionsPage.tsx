import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  DollarSign,
  Zap,
  Info,
  Award,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Flame,
  Layers,
  ChevronRight,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  ProgressBar,
  Modal,
  Slider
} from '../components/ui';
import { OnboardingFormData } from '../types';
import { formatCurrencyINR } from '../utils/helpers';

interface InterventionItem {
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

const interventionDatabase: InterventionItem[] = [
  {
    id: 'led-retrofit',
    name: 'LED Lighting Retrofit & Smart Controls',
    category: 'Energy',
    estimatedInvestment: 65000,
    annualSavings: 38000,
    co2Reduction: 6.5,
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
    estimatedInvestment: 95000,
    annualSavings: 54000,
    co2Reduction: 8.0,
    waterSavings: 0,
    riskCategories: ['Extreme Heat', 'Energy Vulnerability'],
    paybackYears: 1.8,
    complexity: 'Low',
    description: 'High-SRI elastomeric reflective roof coating reducing workshop ambient temperature by 4–6°C.',
  },
  {
    id: 'ie4-motors',
    name: 'IE4 Super-Premium Efficiency Motors',
    category: 'Energy',
    estimatedInvestment: 120000,
    annualSavings: 82000,
    co2Reduction: 14.0,
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
    estimatedInvestment: 35000,
    annualSavings: 24000,
    co2Reduction: 1.2,
    waterSavings: 120000,
    riskCategories: ['Water Stress'],
    paybackYears: 1.5,
    complexity: 'Low',
    description: 'Sensor faucets, low-flow aerators, and pressure-regulating valves across facility restrooms.',
  },
  {
    id: 'rainwater-harvesting',
    name: 'Rainwater Harvesting & Storage System',
    category: 'Water',
    estimatedInvestment: 140000,
    annualSavings: 72000,
    co2Reduction: 3.5,
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
    co2Reduction: 5.2,
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
    co2Reduction: 7.8,
    waterSavings: 0,
    riskCategories: ['Energy Vulnerability'],
    paybackYears: 2.6,
    complexity: 'Medium',
    description: 'Electric 3-wheeler cargo vehicle for local supplier parts dispatch, eliminating diesel fuel costs.',
  },
];

const defaultProfile: OnboardingFormData = {
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

export const InterventionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<OnboardingFormData>(defaultProfile);
  const [budget, setBudget] = useState<number>(300000);
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-b');
  const [activeModalItem, setActiveModalItem] = useState<InterventionItem | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('msme_climate_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile({ ...defaultProfile, ...parsed });
        if (parsed.availableBudgetINR) {
          setBudget(Number(parsed.availableBudgetINR));
        }
      }
    } catch (e) {
      console.error('Error loading saved profile:', e);
    }
  }, []);

  // Deterministic algorithm generating 3 feasible intervention bundles for the budget
  const generateBundles = (currentBudget: number) => {
    // Bundle A: Quick-Payback Starter (Target ~50% of budget)
    const starterItems = [
      interventionDatabase.find((i) => i.id === 'led-retrofit')!,
      interventionDatabase.find((i) => i.id === 'water-fixtures')!,
      interventionDatabase.find((i) => i.id === 'cool-roof')!,
    ].filter((item) => item.estimatedInvestment <= currentBudget * 0.7);

    // Bundle B: Balanced Climate Plan (Target ~75-85% of budget)
    const balancedItems = [
      interventionDatabase.find((i) => i.id === 'led-retrofit')!,
      interventionDatabase.find((i) => i.id === 'cool-roof')!,
      interventionDatabase.find((i) => i.id === 'ie4-motors')!,
      interventionDatabase.find((i) => i.id === 'water-fixtures')!,
    ].filter((_, idx, arr) => {
      const sum = arr.slice(0, idx + 1).reduce((acc, x) => acc + x.estimatedInvestment, 0);
      return sum <= currentBudget;
    });

    // Bundle C: High-Impact Resilience Plan (Target ~90-100% of budget)
    let heavyItems: InterventionItem[] = [];
    if (currentBudget >= 350000) {
      heavyItems = [
        interventionDatabase.find((i) => i.id === 'solar-rooftop-starter')!,
        interventionDatabase.find((i) => i.id === 'led-retrofit')!,
      ];
    } else {
      heavyItems = [
        interventionDatabase.find((i) => i.id === 'ie4-motors')!,
        interventionDatabase.find((i) => i.id === 'rainwater-harvesting')!,
        interventionDatabase.find((i) => i.id === 'cool-roof')!,
      ];
    }
    const highImpactItems = heavyItems.filter((_, idx, arr) => {
      const sum = arr.slice(0, idx + 1).reduce((acc, x) => acc + x.estimatedInvestment, 0);
      return sum <= currentBudget;
    });

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
        items: starterItems,
        metrics: computeMetrics(starterItems),
        tag: 'Quick Payback',
      },
      {
        id: 'bundle-b',
        title: 'Balanced Climate Plan',
        subtitle: 'Multi-hazard resilience combining heat, power & water savings',
        items: balancedItems,
        metrics: computeMetrics(balancedItems),
        tag: 'Recommended Plan',
      },
      {
        id: 'bundle-c',
        title: 'High-Impact Resilience Plan',
        subtitle: 'Maximized long-term carbon reduction and renewable energy offset',
        items: highImpactItems,
        metrics: computeMetrics(highImpactItems),
        tag: 'Deep Decarbonization',
      },
    ];
  };

  const bundles = generateBundles(budget);
  const activeBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[1];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm" icon={<Sliders className="w-3.5 h-3.5" />}>
              Core Decision Engine
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Budget-Aware Selection</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Climate Intervention Optimizer
          </h1>
          <p className="text-xs md:text-sm text-slate-500 max-w-3xl">
            Instead of giving you a generic list of sustainability actions, the optimizer finds combinations of interventions that fit your budget, business constraints and climate priorities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/simulator">
            <Button variant="outline" size="sm" leftIcon={<TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}>
              Simulate Outcomes
            </Button>
          </Link>
          <Link to="/passport">
            <Button variant="primary" size="sm" rightIcon={<Award className="w-3.5 h-3.5" />}>
              Generate Passport
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Budget Control & Profile Context Banner */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-0 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-700/60 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Target Business Budget Constraint
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Available Capex Budget: {formatCurrencyINR(budget)}
            </h3>
            <p className="text-xs text-slate-300">
              Derived from {profile.businessName || 'Shakti Precision Components'} onboarding profile (Payback target: &le; {profile.maxPaybackPeriodYears || 4} yrs).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBudget(300000)}
              className="text-xs text-slate-200 border-slate-600 hover:bg-slate-700"
              leftIcon={<RotateCcw className="w-3 h-3 text-emerald-400" />}
            >
              Reset to ₹3.0L Profile Budget
            </Button>
          </div>
        </div>

        {/* Budget Adjustment Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Customize Available Capital Budget (INR):
            </span>
            <span className="font-extrabold text-emerald-400 text-sm">
              {formatCurrencyINR(budget)}
            </span>
          </div>

          <input
            type="range"
            min={100000}
            max={1000000}
            step={25000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>₹1,00,000 (Min)</span>
            <span>₹3,00,000 (Profile Default)</span>
            <span>₹5,00,000</span>
            <span>₹10,00,000 (Max)</span>
          </div>
        </div>
      </Card>

      {/* Recommended Bundles Section (The Visual Centerpiece) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Feasible Intervention Bundles
            </h3>
            <p className="text-xs text-slate-500">
              Recommended based on your selected constraints ({formatCurrencyINR(budget)} budget).
            </p>
          </div>

          <Badge variant="slate" size="sm" icon={<Info className="w-3.5 h-3.5" />}>
            Illustrative Demo Optimization Engine
          </Badge>
        </div>

        {/* 3 Feasible Bundles Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;

            return (
              <Card
                key={bundle.id}
                className={`space-y-5 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10 bg-gradient-to-b from-white to-emerald-50/20 shadow-md'
                    : 'border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
                onClick={() => setSelectedBundleId(bundle.id)}
              >
                <div className="space-y-4">
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between">
                    <Badge variant={isSelected ? 'emerald' : 'slate'} size="sm">
                      {bundle.tag}
                    </Badge>

                    {isSelected && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Selection
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {bundle.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {bundle.subtitle}
                    </p>
                  </div>

                  {/* Financial & Environmental Key Performance Indicators */}
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
                    <div className="flex justify-between items-baseline border-b border-slate-200 pb-2">
                      <span className="text-xs font-medium text-slate-500">Required Investment:</span>
                      <span className="text-base font-extrabold text-slate-900">
                        {formatCurrencyINR(bundle.metrics.totalInvestment)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Est. Annual Savings:</span>
                        <span className="font-bold text-emerald-700">{formatCurrencyINR(bundle.metrics.annualSavings)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Est. Payback Period:</span>
                        <span className="font-bold text-slate-800">{bundle.metrics.avgPayback} Years</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">CO₂ Avoidance:</span>
                        <span className="font-bold text-teal-700">{bundle.metrics.co2Reduction} tCO₂e / yr</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Water Savings:</span>
                        <span className="font-bold text-teal-700">
                          {bundle.metrics.waterSavings > 0 ? `${(bundle.metrics.waterSavings / 1000).toFixed(0)}k L / yr` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Included Interventions */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Included Interventions ({bundle.items.length}):
                    </span>
                    <ul className="space-y-2 text-xs">
                      {bundle.items.map((item) => (
                        <li key={item.id} className="flex items-start gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">{item.name}</span>
                            <span className="text-[11px] text-slate-500">
                              {formatCurrencyINR(item.estimatedInvestment)} • {item.paybackYears} yr payback
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Climate Risks Addressed */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Climate Risks Addressed:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {bundle.metrics.risks.map((risk) => (
                        <Badge key={risk} variant="teal" size="sm">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBundleId(bundle.id);
                    }}
                  >
                    {isSelected ? 'Bundle Selected' : 'Select This Bundle'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Selected Bundle Action CTA Bar */}
      <Card className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Active Selection: {activeBundle.title}
            </span>
            <h4 className="text-lg font-bold text-white">
              Total Investment: {formatCurrencyINR(activeBundle.metrics.totalInvestment)} • Annual Savings: {formatCurrencyINR(activeBundle.metrics.annualSavings)} / yr
            </h4>
            <p className="text-xs text-slate-400">
              Ready to simulate long-term ROI or generate your bank-ready Climate Action Passport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/simulator')}
              leftIcon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto text-slate-200 border-slate-700 hover:bg-slate-800"
            >
              Simulate This Plan
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/passport')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
            >
              Create Climate Passport
            </Button>
          </div>
        </div>
      </Card>

      {/* Complete Intervention Catalog Table / Grid */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            All Available Interventions Database ({interventionDatabase.length})
          </h3>
          <p className="text-xs text-slate-500">
            Browse individual clean technology specifications and illustrative payback metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {interventionDatabase.map((item) => (
            <Card key={item.id} hoverable className="space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="teal" size="sm">{item.category}</Badge>
                  <span className="text-[11px] font-semibold text-slate-400">{item.complexity} Complexity</span>
                </div>

                <h4 className="font-bold text-slate-900 leading-snug">{item.name}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Capex:</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(item.estimatedInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Annual Savings:</span>
                  <span className="font-bold text-emerald-700">{formatCurrencyINR(item.annualSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Payback:</span>
                  <span className="font-semibold text-slate-800">{item.paybackYears} Yrs</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-slate-600"
                onClick={() => setActiveModalItem(item)}
                leftIcon={<Info className="w-3.5 h-3.5 text-slate-400" />}
              >
                View Full Specifications
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Specifications Modal */}
      {activeModalItem && (
        <Modal
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
          title={activeModalItem.name}
          subtitle={`Technical specification & subsidy overview (${activeModalItem.category} category)`}
          footer={
            <Button variant="primary" onClick={() => setActiveModalItem(null)}>
              Close Specifications
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              {activeModalItem.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <span className="text-slate-400 block">Estimated Capex</span>
                <span className="font-bold text-slate-900 text-sm">{formatCurrencyINR(activeModalItem.estimatedInvestment)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Annual Savings</span>
                <span className="font-bold text-emerald-700 text-sm">{formatCurrencyINR(activeModalItem.annualSavings)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">CO₂ Reduction</span>
                <span className="font-bold text-teal-700">{activeModalItem.co2Reduction} tCO₂e / yr</span>
              </div>
              <div>
                <span className="text-slate-400 block">Simple Payback</span>
                <span className="font-bold text-slate-900">{activeModalItem.paybackYears} Years</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-900">
              <span className="font-bold block flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                SIDBI & Ministry of MSME Subsidy Status
              </span>
              <p className="text-[11px] text-emerald-800">
                Eligible for 15% capital subsidy under SAMARTH scheme and SIDBI 2.5% interest subvention for MSME green upgrades.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
