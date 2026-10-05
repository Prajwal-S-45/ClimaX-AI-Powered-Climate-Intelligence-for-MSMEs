import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  ArrowRight,
  RefreshCw,
  FileCheck2,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRightLeft
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  Card,
  MetricCard,
  Slider,
  Select,
  ChartCard,
  Button,
  Badge
} from '../components/ui';
import { useClimate } from '../context/ClimateContext';
import { formatCurrencyINR } from '../utils/helpers';

export const SimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    profile,
    budget,
    setBudget,
    electricityCost,
    setElectricityCost,
    operatingHours,
    setOperatingHours,
    selectedBundleId,
    setSelectedBundleId,
    bundles,
    activeBundle,
    resetToDefaults,
  } = useClimate();

  // Active bundle dynamic metrics directly from centralized climate context
  const initialInvestment = activeBundle?.metrics.totalInvestment ?? 0;
  const annualSavings = activeBundle?.metrics.annualSavings ?? 0;
  const paybackYears = activeBundle?.metrics.avgPayback ?? 0;
  const annualCO2Reduction = activeBundle?.metrics.co2Reduction ?? 0;
  const annualWaterSavings = activeBundle?.metrics.waterSavings ?? 0;

  // Before vs After comparison values
  const monthlyCostBefore = electricityCost;
  const monthlySavings = Math.round(annualSavings / 12);
  const monthlyCostAfter = Math.max(10000, monthlyCostBefore - monthlySavings);

  const monthlyCO2Before = 14.2;
  const monthlyCO2After = Number(Math.max(1.0, monthlyCO2Before - annualCO2Reduction / 12).toFixed(1));

  // 5-Year Cumulative Cash Flow Data
  const cumulativeCashFlowData = [
    { year: 'Year 0 (Capex)', netCashFlow: -initialInvestment, cumulativeSavings: 0 },
    { year: 'Year 1', netCashFlow: Math.round(-initialInvestment + annualSavings * 1.0), cumulativeSavings: Math.round(annualSavings * 1.0) },
    { year: 'Year 2', netCashFlow: Math.round(-initialInvestment + annualSavings * 2.05), cumulativeSavings: Math.round(annualSavings * 2.05) },
    { year: 'Year 3', netCashFlow: Math.round(-initialInvestment + annualSavings * 3.15), cumulativeSavings: Math.round(annualSavings * 3.15) },
    { year: 'Year 4', netCashFlow: Math.round(-initialInvestment + annualSavings * 4.3), cumulativeSavings: Math.round(annualSavings * 4.3) },
    { year: 'Year 5', netCashFlow: Math.round(-initialInvestment + annualSavings * 5.5), cumulativeSavings: Math.round(annualSavings * 5.5) },
  ];

  // Before vs After Utility Comparison Data
  const beforeAfterCostData = [
    { category: 'Monthly Electricity', baseline: monthlyCostBefore, optimized: monthlyCostAfter },
    { category: 'Monthly Fuel', baseline: 22000, optimized: 14000 },
    { category: 'Monthly Water', baseline: 13000, optimized: Math.max(5000, 13000 - (annualWaterSavings / 12) * 0.08) },
  ];

  // Emissions Trajectory Data (Strictly capped against baseline 170.4 tCO2e/yr)
  const baselineAnnualCO2 = 170.4;
  const emissionsTrajectoryData = [
    { year: 'Baseline', baselineCO2: baselineAnnualCO2, optimizedCO2: baselineAnnualCO2 },
    { year: 'Year 1', baselineCO2: baselineAnnualCO2, optimizedCO2: Number((baselineAnnualCO2 - annualCO2Reduction).toFixed(1)) },
    { year: 'Year 2', baselineCO2: baselineAnnualCO2, optimizedCO2: Number((baselineAnnualCO2 - annualCO2Reduction * 1.1).toFixed(1)) },
    { year: 'Year 3', baselineCO2: baselineAnnualCO2, optimizedCO2: Number((baselineAnnualCO2 - annualCO2Reduction * 1.2).toFixed(1)) },
    { year: 'Year 4', baselineCO2: baselineAnnualCO2, optimizedCO2: Number((baselineAnnualCO2 - annualCO2Reduction * 1.25).toFixed(1)) },
    { year: 'Year 5', baselineCO2: baselineAnnualCO2, optimizedCO2: Number((baselineAnnualCO2 - annualCO2Reduction * 1.3).toFixed(1)) },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="teal" size="sm" icon={<TrendingUp className="w-3.5 h-3.5" />}>
              Scenario Modeling Engine
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Illustrative Prototype Estimate</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Climate Investment Simulator
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Interactive financial & carbon scenario modeling for {profile.businessName || 'Shakti Precision Components'}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/interventions">
            <Button variant="outline" size="sm" leftIcon={<Sliders className="w-3.5 h-3.5" />}>
              Review Interventions
            </Button>
          </Link>
          <Link to="/passport">
            <Button variant="primary" size="sm" rightIcon={<FileCheck2 className="w-3.5 h-3.5" />}>
              Create Climate Passport
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Controls Panel & Analytical Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Simulation Controls */}
        <Card className="lg:col-span-1 space-y-5 bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Simulation Controls
              </h3>
              <Badge variant="emerald" size="sm">
                Live Shared State
              </Badge>
            </div>

            {/* Control 1: Investment Budget */}
            <div className="space-y-2">
              <Slider
                label="1. Available Investment Budget (INR)"
                value={budget}
                min={100000}
                max={1000000}
                step={25000}
                onChange={(val) => setBudget(val)}
                valueFormat={(val) => formatCurrencyINR(val)}
                minLabel="₹1L"
                maxLabel="₹10L"
              />
            </div>

            {/* Control 2: Monthly Electricity Bill */}
            <div className="space-y-2">
              <Slider
                label="2. Monthly Electricity Bill (INR)"
                value={electricityCost}
                min={30000}
                max={200000}
                step={5000}
                onChange={(val) => setElectricityCost(val)}
                valueFormat={(val) => formatCurrencyINR(val)}
                minLabel="₹30k"
                maxLabel="₹2 Lakhs"
              />
            </div>

            {/* Control 3: Operating Hours per Day */}
            <div className="space-y-2">
              <Slider
                label="3. Facility Operating Hours (hrs/day)"
                value={operatingHours}
                min={6}
                max={24}
                step={1}
                onChange={(val) => setOperatingHours(val)}
                valueFormat={(val) => `${val} hours / day`}
                minLabel="6 hrs"
                maxLabel="24 hrs"
              />
            </div>

            {/* Control 4: Intervention Bundle Selector */}
            <div className="space-y-2">
              <Select
                label="4. Selected Intervention Bundle"
                value={selectedBundleId}
                onChange={(e) => setSelectedBundleId(e.target.value)}
                options={bundles.map((b) => ({
                  value: b.id,
                  label: `${b.title} (${formatCurrencyINR(b.metrics.totalInvestment)})`,
                }))}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={resetToDefaults}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 text-slate-500" />}
            >
              Reset Default Inputs
            </Button>
          </div>
        </Card>

        {/* Right 2 Columns: Dynamic Outputs & Metric Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard
              title="Initial Investment"
              value={formatCurrencyINR(initialInvestment)}
              subtitle="Selected bundle capex"
              accentColor="navy"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <MetricCard
              title="Annual Savings"
              value={formatCurrencyINR(annualSavings)}
              subtitle="Utility reduction"
              accentColor="emerald"
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <MetricCard
              title="Payback Period"
              value={`${paybackYears} Yrs`}
              subtitle={`Target ≤ ${profile.maxPaybackPeriodYears || 4} yrs`}
              accentColor="amber"
              icon={<CheckCircle2 className="w-4 h-4" />}
            />
            <MetricCard
              title="CO₂ Avoidance"
              value={`${annualCO2Reduction} t/yr`}
              subtitle="Scope 1 & 2 offset"
              accentColor="teal"
              icon={<ShieldCheck className="w-4 h-4" />}
            />
          </div>

          {/* Prominent "Before vs After" Comparison Section */}
          <Card className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-white">Before vs After Performance</h3>
              </div>
              <Badge variant="emerald" size="sm">
                Active Bundle: {activeBundle ? activeBundle.title : 'None'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block">Electricity Cost / Month</span>
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="text-slate-400 line-through text-xs">{formatCurrencyINR(monthlyCostBefore)}</span>
                  <span className="text-emerald-400 font-extrabold text-base">{formatCurrencyINR(monthlyCostAfter)}</span>
                </div>
                <span className="text-[11px] text-emerald-300 font-semibold block">
                  Save {formatCurrencyINR(monthlySavings)} / mo
                </span>
              </div>

              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block">Annual Operating Savings</span>
                <div className="text-lg font-extrabold text-emerald-400 pt-0.5">
                  {formatCurrencyINR(annualSavings)} <span className="text-xs text-slate-300 font-normal">/ yr</span>
                </div>
                <span className="text-[11px] text-slate-300 block">Operating margin boost</span>
              </div>

              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block">Payback Period</span>
                <div className="text-lg font-extrabold text-amber-400 pt-0.5">
                  {paybackYears} Years
                </div>
                <span className="text-[11px] text-emerald-300 font-semibold block">
                  Fits &le; {profile.maxPaybackPeriodYears || 4} yr target
                </span>
              </div>

              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block">Monthly Carbon Footprint</span>
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="text-slate-400 line-through text-xs">{monthlyCO2Before} t</span>
                  <span className="text-teal-400 font-extrabold text-base">{monthlyCO2After} tCO₂e</span>
                </div>
                <span className="text-[11px] text-teal-300 font-semibold block">
                  -{annualCO2Reduction} tCO₂e / year
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center font-mono">
              Illustrative estimate for prototype demonstration.
            </div>
          </Card>
        </div>
      </div>

      {/* 4 Interactive Visual Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Investment vs Annual Savings */}
        <ChartCard
          title="1. Capex Investment vs Annual Savings"
          subtitle="One-time capital expenditure vs recurring annual operational savings"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { category: 'Required Capex', amount: initialInvestment },
                  { category: 'Annual Savings', amount: annualSavings },
                ]}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [formatCurrencyINR(Number(value)), 'Amount']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Cumulative Net Cash Flow over 5 Years */}
        <ChartCard
          title="2. Cumulative Net Cash Flow over 5 Years"
          subtitle="Break-even point and cumulative financial returns trajectory"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeCashFlowData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [formatCurrencyINR(Number(value)), 'Net Cash Flow']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="netCashFlow" stroke="#059669" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 3: Before vs After Energy Cost */}
        <ChartCard
          title="3. Baseline vs Optimized Monthly Utility Costs"
          subtitle="Monthly utility cost comparison before and after clean energy intervention"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={beforeAfterCostData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [formatCurrencyINR(Number(value)), 'Expense']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="baseline" name="Baseline Expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimized" name="Optimized Expense" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 4: Estimated CO2 Reduction */}
        <ChartCard
          title="4. Estimated Annual CO₂ Emission Trajectory"
          subtitle="Scope 1 & 2 carbon footprint reduction over 5-year operational horizon"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emissionsTrajectoryData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v} t`} />
                <Tooltip
                  formatter={(value: any) => [`${value} Tons CO₂`, 'Emissions']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="baselineCO2" name="Baseline Trajectory" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="optimizedCO2" name="Decarbonized Path" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* "Why this plan?" Explanation Section */}
      <Card className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-950">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h3 className="text-lg font-bold">Why this plan?</h3>
        </div>

        <p className="text-xs md:text-sm text-emerald-900 leading-relaxed font-medium">
          This plan fits within your <span className="font-extrabold text-slate-900">{formatCurrencyINR(budget)}</span> available budget and prioritizes your high energy-cost exposure (<span className="font-extrabold text-slate-900">{formatCurrencyINR(electricityCost)}/month</span>) operating <span className="font-extrabold text-slate-900">{operatingHours} hours/day</span>, while keeping the estimated payback period of <span className="font-extrabold text-slate-900">{paybackYears} years</span> strictly within your preferred period of <span className="font-extrabold text-slate-900">{profile.maxPaybackPeriodYears || 4} years</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 block">Capital Budget Alignment</span>
            <p className="text-[11px] text-slate-600">
              Allocates {formatCurrencyINR(initialInvestment)} out of your {formatCurrencyINR(budget)} budget, leaving emergency cash reserves.
            </p>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 block">Operational Stress Mitigation</span>
            <p className="text-[11px] text-slate-600">
              Directly addresses DISCOM peak power tariffs during your {operatingHours}-hour daily operation cycle.
            </p>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 block">Finance Documentation Readiness</span>
            <p className="text-[11px] text-slate-600">
              Generates structured payback & emission abatement metrics for SIDBI green credit approval.
            </p>
          </div>
        </div>
      </Card>

      {/* Formal Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>Notice & Model Disclaimer</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          Illustrative estimate for prototype demonstration. All projected financial savings, payback timelines, and carbon abatement figures are model outputs generated for planning and finance documentation submission. They do not constitute guaranteed financial returns or legally binding commitments.
        </p>
      </div>

      {/* Bottom Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
        <div className="text-xs text-slate-500">
          Ready to issue your formal Finance-ready Climate Action Passport?
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/interventions')}
            className="w-full sm:w-auto"
          >
            Modify Interventions
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/passport')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Create Climate Passport
          </Button>
        </div>
      </div>
    </div>
  );
};
