import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  Zap,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MetricCard, Card, CardHeader, CardTitle, CardDescription, CardContent, RiskBadge, ProgressBar, Badge, Button, ChartCard } from '../components/ui';
import { mockMSMEProfile } from '../data/mockData';

const projectionData = [
  { year: '2026 (Baseline)', currentCost: 22.2, projectedSavings: 0, co2Saved: 0 },
  { year: 'Year 1', currentCost: 23.5, projectedSavings: 6.75, co2Saved: 80 },
  { year: 'Year 2', currentCost: 24.8, projectedSavings: 13.5, co2Saved: 160 },
  { year: 'Year 3', currentCost: 26.2, projectedSavings: 20.25, co2Saved: 240 },
  { year: 'Year 4', currentCost: 27.8, projectedSavings: 27.0, co2Saved: 320 },
  { year: 'Year 5', currentCost: 29.5, projectedSavings: 33.75, co2Saved: 400 },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Active MSME Passport Profile
            </Badge>
            <span className="text-xs text-slate-400 font-mono">ID: CAP-IN-2026-8891</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7 text-emerald-700" />
            Executive Climate & Financial Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Decarbonization strategy overview and risk liabilities for {mockMSMEProfile.businessName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/simulator">
            <Button variant="outline" size="sm" leftIcon={<TrendingUp className="w-3.5 h-3.5" />}>
              What-if Simulator
            </Button>
          </Link>
          <Link to="/passport">
            <Button variant="primary" size="sm" leftIcon={<FileCheck2 className="w-3.5 h-3.5" />}>
              View Action Passport
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Financial & Climate KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Climate Vulnerability Index"
          value="74 / 100"
          subtitle="Monsoon Flooding & CBAM Tax Exposure"
          trend={{ value: 'High Exposure', direction: 'down', label: 'requires intervention' }}
          accentColor="amber"
          icon={<ShieldAlert className="w-5 h-5" />}
        />
        <MetricCard
          title="Optimum Capex Budget"
          value="₹26.5 Lakhs"
          subtitle="Solar PV + IE4 Motors + Rainwater"
          trend={{ value: 'Payback 3.8 Yrs', direction: 'neutral' }}
          accentColor="navy"
          icon={<Zap className="w-5 h-5" />}
        />
        <MetricCard
          title="Annual CO₂ Abatement"
          value="80 Tons / yr"
          subtitle="Scope 1 & Scope 2 footprint reduction"
          trend={{ value: '42.5%', direction: 'up', label: 'vs 2026 baseline' }}
          accentColor="emerald"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Projected 5-Yr Savings"
          value="₹33.75 Lakhs"
          subtitle="Electricity tariffs & diesel offset"
          trend={{ value: '24.5% IRR', direction: 'up', label: 'financial yield' }}
          accentColor="teal"
          icon={<Award className="w-5 h-5" />}
        />
      </div>

      {/* Main Analytical Chart & Priority Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial & Carbon Abatement Trajectory */}
        <div className="lg:col-span-2">
          <ChartCard
            title="5-Year Cumulative Savings & CO₂ Abatement Trajectory"
            subtitle="Financial savings (in ₹ Lakhs) generated from recommended intervention bundle"
          >
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit=" L" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="projectedSavings" name="Cumulative Savings (₹ Lakhs)" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Climate Risk Liabilities Summary */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle className="text-base">Top Risk Liabilities</CardTitle>
            <CardDescription>Evaluated for {mockMSMEProfile.city} site</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Monsoon Flooding Downtime</span>
                <RiskBadge severity="High" />
              </div>
              <ProgressBar value={78} color="amber" showValue={false} />
              <p className="text-[11px] text-slate-500">Workshop inundation risk during NE monsoons.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">EU CBAM Export Tax Penalty</span>
                <RiskBadge severity="Critical" />
              </div>
              <ProgressBar value={88} color="rose" showValue={false} />
              <p className="text-[11px] text-slate-500">Tier-1 OEM buyers mandating verified emissions log.</p>
            </div>
          </CardContent>

          <div className="pt-2">
            <Link to="/climate-risk">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Detailed Risk Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
