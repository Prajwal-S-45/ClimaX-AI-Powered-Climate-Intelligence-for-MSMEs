import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ShieldAlert, Sliders, TrendingUp, FileCheck2, BarChart3, Building2, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge, MetricCard } from '../components/ui';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-8 py-2">
      {/* Hero Banner with Subtle Financial Gradient */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-8 md:p-12 shadow-md overflow-hidden">
        {/* Background decorative graphic pattern */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-5 relative z-10">
          <Badge variant="emerald" size="md" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Bank & OEM CBAM Compliant Platform
          </Badge>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Climate Action <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Passport</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            The decision engine for Indian MSMEs to evaluate climate risks, optimize decarbonization investments within capital budgets, and present verified impact evidence to lenders and supply chain partners.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/onboarding">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start MSME Assessment
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="MSME Target Sector"
          value="Auto Components"
          subtitle="Tier-1 & Tier-2 OEMs"
          accentColor="emerald"
          icon={<Building2 className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg CO₂ Abatement"
          value="88 Tons / Year"
          subtitle="Scope 1 & Scope 2 baseline"
          trend={{ value: '42%', direction: 'up', label: 'footprint reduction' }}
          accentColor="teal"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg Investment Payback"
          value="3.8 Years"
          subtitle="IRR ~24.5% annual yield"
          trend={{ value: 'Fast Payback', direction: 'neutral' }}
          accentColor="navy"
          icon={<BarChart3 className="w-5 h-5" />}
        />
      </div>

      {/* Modular SaaS Feature Workflow */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Platform Workflow</h2>
            <p className="text-xs text-slate-500">6-Step Decarbonization & Risk Passport Architecture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Climate Risk Analysis</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Evaluate location-based flood, heatwave, and monsoon disruptions alongside CBAM carbon tax transition liabilities.
            </p>
            <Link to="/climate-risk" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Analyze Risks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Intervention Optimizer</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Filter high-ROI equipment upgrades (Rooftop Solar, IE4 Motors, Rainwater Harvest) matching available budget constraints.
            </p>
            <Link to="/interventions" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Optimize Choices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. What-if Simulator</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Simulate cash flow, NPV benefits, and carbon abatement curves across 3, 5, and 10-year operational horizons.
            </p>
            <Link to="/simulator" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Run Simulation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Action Passport</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generate audited digital certificates detailing baseline emissions, target milestones, and risk scores.
            </p>
            <Link to="/passport" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              View Passport <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">5. Impact Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload utility bill evidence and compare actual vs predicted energy savings for bank green-loan discounts.
            </p>
            <Link to="/impact" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Verify Evidence <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-3 bg-slate-900 text-white border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Bank & OEM Export Ready</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equip your enterprise with standardized data sheets aligned with SIDBI green credit schemes and EU export compliance.
            </p>
            <Link to="/dashboard">
              <Button variant="primary" size="sm" className="mt-2 w-full">
                Go to Main Dashboard
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
