import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldAlert,
  Sliders,
  FileCheck2,
  BarChart3,
  Building2,
  Coins,
  Wrench,
  TrendingUp,
  Flame,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Play
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { OnboardingFormData } from '../types';

export const demoMSMEProfile: OnboardingFormData & { isDemoMode: boolean } = {
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
  isDemoMode: true,
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchDemo = () => {
    localStorage.setItem('msme_climate_profile', JSON.stringify(demoMSMEProfile));
    navigate('/dashboard');
  };

  return (
    <div className="space-y-12 py-2">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-8 md:p-14 shadow-xl overflow-hidden border border-slate-800">
        {/* Background decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-6 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="emerald" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
              AI-Powered Climate Intelligence for MSMEs
            </Badge>
            <Badge variant="teal" size="sm">
              Hackathon Presentation Mode Ready
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Turn Climate Risk Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">Climate Action.</span>
          </h1>

          <p className="text-slate-300 text-base md:text-xl leading-relaxed max-w-3xl font-normal">
            An AI-powered decision platform that helps MSMEs identify climate risks, optimize sustainability investments, prepare finance-ready projects, and measure real-world impact.
          </p>

          <div className="pt-3 flex flex-wrap gap-4 items-center">
            {/* Prominent Launch Live Demo Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleLaunchDemo}
              leftIcon={<Play className="w-5 h-5 fill-current" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="shadow-xl shadow-emerald-900/50 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base"
            >
              Launch Live Demo (Shakti Precision)
            </Button>

            <Link to="/onboarding">
              <Button variant="outline" size="lg" className="bg-slate-800/80 text-slate-100 border-slate-700 hover:bg-slate-700/80">
                Create Custom Profile
              </Button>
            </Link>
          </div>

          {/* Quick value chips */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Budget-Aware Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Finance-Ready Passports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Location Risk Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Real-World Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Flow Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="navy" size="sm">Decision Framework</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How Climate Action Passport Works</h2>
          <p className="text-sm text-slate-600">A continuous flow from vulnerability assessment to verified impact.</p>
        </div>

        {/* Visual Flow Diagram */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-800">
          {/* Desktop Horizontal Flow */}
          <div className="hidden lg:flex items-center justify-between gap-2 relative">
            <div className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Step 1</div>
              <div className="font-bold text-sm text-white">Climate Risk</div>
              <p className="text-xs text-slate-400 mt-1">Physical & transition hazard mapping</p>
            </div>

            <div className="flex flex-col items-center px-1">
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Step 2</div>
              <div className="font-bold text-sm text-white">Business Impact</div>
              <p className="text-xs text-slate-400 mt-1">Financial & operational risk scoring</p>
            </div>

            <div className="flex flex-col items-center px-1">
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Step 3</div>
              <div className="font-bold text-sm text-white">Investment Optimization</div>
              <p className="text-xs text-slate-400 mt-1">ROI & budget-constrained action plans</p>
            </div>

            <div className="flex flex-col items-center px-1">
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Step 4</div>
              <div className="font-bold text-sm text-white">Climate Action Passport</div>
              <p className="text-xs text-slate-400 mt-1">Finance-ready project documentation</p>
            </div>

            <div className="flex flex-col items-center px-1">
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Step 5</div>
              <div className="font-bold text-sm text-white">Impact Verification</div>
              <p className="text-xs text-slate-400 mt-1">Actual vs predicted metric tracking</p>
            </div>
          </div>

          {/* Mobile Vertical Flow */}
          <div className="flex lg:hidden flex-col items-center space-y-3">
            <div className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Climate Risk</div>
                <p className="text-xs text-slate-400">Physical & transition hazard mapping</p>
              </div>
            </div>

            <ChevronDown className="w-5 h-5 text-emerald-400" />

            <div className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Business Impact</div>
                <p className="text-xs text-slate-400">Financial & operational risk scoring</p>
              </div>
            </div>

            <ChevronDown className="w-5 h-5 text-emerald-400" />

            <div className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Investment Optimization</div>
                <p className="text-xs text-slate-400">ROI & budget-constrained action plans</p>
              </div>
            </div>

            <ChevronDown className="w-5 h-5 text-emerald-400" />

            <div className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Climate Action Passport</div>
                <p className="text-xs text-slate-400">Bank-ready project documentation</p>
              </div>
            </div>

            <ChevronDown className="w-5 h-5 text-emerald-400" />

            <div className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Impact Verification</div>
                <p className="text-xs text-slate-400">Actual vs predicted metric tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Modules */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">From Climate Risk to Measurable Action</h2>
          <p className="text-sm text-slate-600 mt-1">Four structured phases to move your business from analysis to execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="space-y-4 border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Phase 1</span>
                <h3 className="text-lg font-bold text-slate-900">1. Assess</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Identify climate and resource risks.
              </p>
            </div>
            <Link to="/climate-risk" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 border-t border-slate-100">
              Run Assessment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-4 border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Phase 2</span>
                <h3 className="text-lg font-bold text-slate-900">2. Optimize</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Find the best intervention within the business's budget.
              </p>
            </div>
            <Link to="/interventions" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 border-t border-slate-100">
              Optimize Interventions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-4 border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Phase 3</span>
                <h3 className="text-lg font-bold text-slate-900">3. Finance</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create a structured, finance-ready project passport.
              </p>
            </div>
            <Link to="/passport" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 border-t border-slate-100">
              Generate Passport <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card hoverable className="space-y-4 border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Phase 4</span>
                <h3 className="text-lg font-bold text-slate-900">4. Verify</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compare predicted and actual impact.
              </p>
            </div>
            <Link to="/impact" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 border-t border-slate-100">
              Track Evidence <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </div>

      {/* Built for MSMEs */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <Badge variant="teal" size="sm">Purpose Built</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Built for MSMEs</h2>
          <p className="text-sm text-slate-600">
            Designed specifically around the operating conditions, financial realities, and practical constraints of small and medium enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Limited Budgets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides ROI-ranked intervention pathways tailored to fit available capital without compromising operational cash flow.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Limited Technical Expertise</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Translates complex climate models and carbon accounting formulas into plain-language, actionable decisions.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Rising Operating Costs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Focuses on high-efficiency equipment and waste reduction that lower monthly energy and resource bills.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 text-center space-y-6 shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Take the First Step Toward Climate Resilience
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Assess your risks, model budget-aligned interventions, and generate your bank-ready Climate Action Passport today.
          </p>

          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLaunchDemo}
              leftIcon={<Play className="w-5 h-5 fill-current" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="px-8 py-3 text-base shadow-xl shadow-emerald-900/40 bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              Launch Live Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
