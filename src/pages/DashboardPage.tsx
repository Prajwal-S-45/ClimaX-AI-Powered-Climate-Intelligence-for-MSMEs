import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Zap,
  Droplets,
  DollarSign,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Flame,
  CloudRain,
  ChevronRight,
  MapPin
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  MetricCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  RiskBadge,
  Badge,
  Button,
  ChartCard
} from '../components/ui';
import { useClimate } from '../context/ClimateContext';
import { formatCurrencyINR } from '../utils/helpers';

// Deterministic 6-month resource cost breakdown data
const monthlyCostBreakdownData = [
  { month: 'Jan', electricity: 74000, water: 11500, fuel: 20000, total: 105500 },
  { month: 'Feb', electricity: 76000, water: 12000, fuel: 21000, total: 109000 },
  { month: 'Mar', electricity: 78000, water: 12500, fuel: 22000, total: 112500 },
  { month: 'Apr', electricity: 82000, water: 14000, fuel: 24500, total: 120500 },
  { month: 'May', electricity: 85000, water: 15500, fuel: 26000, total: 126500 },
  { month: 'Jun', electricity: 78000, water: 13000, fuel: 22000, total: 113000 },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, budget, activeBundle, baselineEmissions } = useClimate();

  const businessName = profile.businessName || 'Shakti Precision Components';
  const electricityBill = Number(profile.monthlyElectricityBillINR) || 78000;
  const waterConsumption = Number(profile.monthlyWaterConsumptionLitres) || 85000;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Active MSME Profile
            </Badge>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {profile.location || 'Bengaluru, Karnataka'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {businessName}
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Your Climate Transition Overview — Track operational risks, utility baselines, and high-ROI decarbonization targets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/onboarding">
            <Button variant="outline" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-600" />}>
              Edit Profile
            </Button>
          </Link>
          <Link to="/interventions">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View Interventions
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Climate Risk"
          value="High"
          subtitle="Score: 74 / 100"
          trend={{ value: 'High Exposure', direction: 'down', label: 'needs action' }}
          accentColor="amber"
          icon={<ShieldAlert className="w-5 h-5" />}
        />

        <MetricCard
          title="Energy Cost"
          value={formatCurrencyINR(electricityBill)}
          subtitle="Monthly power expense"
          trend={{ value: '10 hrs/day', direction: 'neutral', label: 'operation' }}
          accentColor="rose"
          icon={<Zap className="w-5 h-5" />}
        />

        <MetricCard
          title="Water Usage"
          value={`${waterConsumption.toLocaleString()} L`}
          subtitle="Monthly water volume"
          trend={{ value: 'Tanker dependent', direction: 'down', label: 'high cost' }}
          accentColor="teal"
          icon={<Droplets className="w-5 h-5" />}
        />

        <MetricCard
          title="Available Green Budget"
          value={formatCurrencyINR(budget)}
          subtitle="Allocated capex budget"
          trend={{ value: 'Budget Ready', direction: 'up', label: 'unlocked' }}
          accentColor="emerald"
          icon={<DollarSign className="w-5 h-5" />}
        />

        <MetricCard
          title="Baseline Emissions"
          value={`${baselineEmissions.monthlyTotalCO2} tCO₂e`}
          subtitle="Monthly Scope 1 & 2"
          trend={{ value: 'Baseline', direction: 'neutral' }}
          accentColor="navy"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Risk Overview & Opportunity Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col (2 spans): Climate Risk Overview & Cost Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Climate Risk Overview Section */}
          <Card className="space-y-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-600" />
                    Climate Risk Overview
                  </CardTitle>
                  <CardDescription>
                    Evaluated operational hazards for your enterprise location
                  </CardDescription>
                </div>
                <Link to="/climate-risk">
                  <Button variant="ghost" size="sm" className="text-xs text-emerald-700">
                    Full Risk Analysis <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-600" />
                      Heat Risk
                    </span>
                    <RiskBadge severity="High" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Summer cooling load spikes causing machinery overheating and power surge costs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CloudRain className="w-4 h-4 text-blue-600" />
                      Flood Risk
                    </span>
                    <RiskBadge severity="Medium" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Monsoon waterlogging risk disrupting raw material logistics and access roads.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-teal-600" />
                      Water Stress
                    </span>
                    <RiskBadge severity="High" />
                  </div>
                  <p className="text-xs text-slate-600">
                    High groundwater depletion in industrial zone requiring expensive tanker purchases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-rose-600" />
                      Energy Vulnerability
                    </span>
                    <RiskBadge severity="High" />
                  </div>
                  <p className="text-xs text-slate-600">
                    High DISCOM peak-hour power tariffs and expensive diesel generator backup usage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Resource Cost Chart */}
          <ChartCard
            title="Monthly Resource Cost Breakdown (INR)"
            subtitle="6-month electricity, water tanker, and fuel expense distribution"
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCostBreakdownData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: any) => [formatCurrencyINR(Number(value)), 'Expense']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Bar dataKey="electricity" name="Electricity (DISCOM)" fill="#0284c7" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="water" name="Water (Tankers/Grid)" fill="#0d9488" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="fuel" name="Fuel (Diesel Genset)" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Right Col (1 span): Opportunity Snapshot & Passport Status Card */}
        <div className="space-y-6">
          {/* Opportunity Snapshot */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Selected Opportunity Snapshot
              </CardTitle>
              <CardDescription>
                Projected impact from active bundle ({activeBundle.title})
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Potential Annual Savings</span>
                <div className="text-lg font-extrabold text-slate-900">
                  {formatCurrencyINR(activeBundle.metrics.annualSavings)} <span className="text-xs text-emerald-700 font-semibold">/ year</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Potential Water Savings</span>
                <div className="text-lg font-extrabold text-slate-900">
                  {activeBundle.metrics.waterSavings > 0 ? `${(activeBundle.metrics.waterSavings / 1000).toFixed(0)}k Litres` : 'N/A'} <span className="text-xs text-teal-700 font-semibold">/ year</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Potential CO₂ Reduction</span>
                <div className="text-lg font-extrabold text-slate-900">
                  {activeBundle.metrics.co2Reduction} Tons <span className="text-xs text-emerald-700 font-semibold">/ year</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-xs text-emerald-800 font-medium">Estimated Investment Capex</span>
                <div className="text-lg font-extrabold text-emerald-800">
                  {formatCurrencyINR(activeBundle.metrics.totalInvestment)}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Fits within your {formatCurrencyINR(budget)} available green budget!
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Link to="/simulator" className="w-full">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Run What-If Simulator <TrendingUp className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Climate Action Passport Status Card */}
          <Card className="space-y-4 border-2 border-slate-300 shadow-sm bg-gradient-to-b from-white to-slate-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  Climate Action Passport
                </CardTitle>
                <Badge variant="purple" size="sm">
                  Ready for Review
                </Badge>
              </div>
              <CardDescription>Structured project documentation for financing</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Status: Ready for Review ({activeBundle.title})</span>
                </div>
                <p className="text-xs text-amber-800">
                  Select green interventions and submit project evidence to issue a Finance-ready digital passport.
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/passport" className="w-full">
                <Button variant="primary" size="md" className="w-full shadow-xs" leftIcon={<Award className="w-4 h-4" />}>
                  Create Passport
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Recommended Next Actions Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Recommended Next Actions
            </h3>
            <p className="text-xs text-slate-500">
              High-impact sustainability interventions tailored for {businessName}.
            </p>
          </div>
          <Link to="/interventions">
            <Button variant="ghost" size="sm" className="text-xs text-emerald-700">
              View All Interventions <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Optimize Energy */}
          <Card className="space-y-4 hover:border-emerald-300 transition-all shadow-xs">
            <CardHeader className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">1. Optimize Energy Efficiency</CardTitle>
              <Badge variant="emerald" size="sm">
                Payback: 1.5 Yrs
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Reason:</span>
                <p className="text-slate-500">
                  High DISCOM grid tariffs and low efficiency air compressor equipment.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block">Est. Investment:</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(120000)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expected Annual Benefit:</span>
                  <span className="font-bold text-emerald-700">{formatCurrencyINR(82000)} / yr</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/interventions" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Intervention
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Card 2: Reduce Heat Exposure */}
          <Card className="space-y-4 hover:border-emerald-300 transition-all shadow-xs">
            <CardHeader className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">2. Reduce Heat Exposure</CardTitle>
              <Badge variant="amber" size="sm">
                Payback: 1.8 Yrs
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Reason:</span>
                <p className="text-slate-500">
                  Roof solar reflectance & thermal insulation reduces ambient indoor heat by 4–6°C.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block">Est. Investment:</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(95000)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expected Annual Benefit:</span>
                  <span className="font-bold text-emerald-700">{formatCurrencyINR(54000)} / yr</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/interventions" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Intervention
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Card 3: Improve Water Efficiency */}
          <Card className="space-y-4 hover:border-emerald-300 transition-all shadow-xs">
            <CardHeader className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">3. Improve Water Efficiency</CardTitle>
              <Badge variant="teal" size="sm">
                Payback: 1.3 Yrs
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Reason:</span>
                <p className="text-slate-500">
                  Rainwater harvesting & recycling reduces tanker dependency by 45%.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block">Est. Investment:</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(65000)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expected Annual Benefit:</span>
                  <span className="font-bold text-emerald-700">{formatCurrencyINR(49000)} / yr</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/interventions" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Intervention
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Prominent CTA Banner */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl border-0 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="emerald" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Budget-Aware Optimization Ready
            </Badge>
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Optimize My Climate Investment
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Select and bundle optimal climate interventions based on your available {formatCurrencyINR(budget)} capex budget to maximize ROI and lower operational risks.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/interventions')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md"
            >
              Optimize My Climate Investment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
