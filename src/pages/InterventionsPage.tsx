import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Info,
  Award,
  ShieldCheck,
  TrendingUp,
  Layers,
  RotateCcw
} from 'lucide-react';
import {
  Card,
  Badge,
  Button,
  Modal
} from '../components/ui';
import { useClimate } from '../context/ClimateContext';
import { interventionDatabase, InterventionItem } from '../utils/climateEngine';
import { formatCurrencyINR } from '../utils/helpers';

// Piecewise mapping helper functions for budget slider milestones:
// Milestone 0: 0% (pos 0)   -> ₹1,00,000
// Milestone 1: 33% (pos 100) -> ₹3,00,000
// Milestone 2: 67% (pos 200) -> ₹5,00,000
// Milestone 3: 100% (pos 300)-> ₹10,00,000

const budgetToSliderPosition = (val: number): number => {
  if (val <= 100000) return 0;
  if (val <= 300000) {
    return ((val - 100000) / (300000 - 100000)) * 100;
  }
  if (val <= 500000) {
    return 100 + ((val - 300000) / (500000 - 300000)) * 100;
  }
  if (val <= 1000000) {
    return 200 + ((val - 500000) / (1000000 - 500000)) * 100;
  }
  return 300;
};

const sliderPositionToBudget = (pos: number): number => {
  if (pos <= 0) return 100000;
  if (pos >= 300) return 1000000;

  // Snap exactly to milestone values if close
  if (Math.abs(pos - 0) < 0.5) return 100000;
  if (Math.abs(pos - 100) < 0.5) return 300000;
  if (Math.abs(pos - 200) < 0.5) return 500000;
  if (Math.abs(pos - 300) < 0.5) return 1000000;

  let rawBudget = 100000;
  if (pos <= 100) {
    const ratio = pos / 100;
    rawBudget = 100000 + ratio * (300000 - 100000);
  } else if (pos <= 200) {
    const ratio = (pos - 100) / 100;
    rawBudget = 300000 + ratio * (500000 - 300000);
  } else {
    const ratio = (pos - 200) / 100;
    rawBudget = 500000 + ratio * (1000000 - 500000);
  }

  // Round to nearest 5,000 step for clean budget increments
  return Math.round(rawBudget / 5000) * 5000;
};

export const InterventionsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    profile,
    budget,
    setBudget,
    selectedBundleId,
    setSelectedBundleId,
    bundles,
    activeBundle,
  } = useClimate();

  const [activeModalItem, setActiveModalItem] = useState<InterventionItem | null>(null);

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
              onClick={() => setBudget(100000)}
              className="text-xs text-slate-200 border-slate-600 hover:bg-slate-700"
              leftIcon={<RotateCcw className="w-3 h-3 text-emerald-400" />}
            >
              Reset to ₹1.0L Starter Budget
            </Button>
          </div>
        </div>

        {/* Budget Adjustment Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span id="budget-slider-label" className="font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Customize Available Capital Budget (INR):
            </span>
            <span className="font-extrabold text-emerald-400 text-sm">
              {formatCurrencyINR(budget)}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={300}
            step={1}
            value={budgetToSliderPosition(budget)}
            onChange={(e) => setBudget(sliderPositionToBudget(Number(e.target.value)))}
            aria-label="Available capital budget in INR"
            aria-labelledby="budget-slider-label"
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span onClick={() => setBudget(100000)} className="cursor-pointer hover:text-emerald-400 transition-colors">
              ₹1,00,000 (Starter)
            </span>
            <span onClick={() => setBudget(300000)} className="cursor-pointer hover:text-emerald-400 transition-colors">
              ₹3,00,000 (Profile Default)
            </span>
            <span onClick={() => setBudget(500000)} className="cursor-pointer hover:text-emerald-400 transition-colors">
              ₹5,00,000
            </span>
            <span onClick={() => setBudget(1000000)} className="cursor-pointer hover:text-emerald-400 transition-colors">
              ₹10,00,000 (Max)
            </span>
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
            Illustrative Prototype Estimates
          </Badge>
        </div>

        {/* 3 Feasible Bundles Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;
            const isFeasible = bundle.isFeasible;

            return (
              <Card
                key={bundle.id}
                className={`space-y-5 flex flex-col justify-between transition-all duration-200 ${isFeasible ? 'cursor-pointer' : 'opacity-80 bg-slate-50/60 cursor-not-allowed'
                  } ${isSelected
                    ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10 bg-gradient-to-b from-white to-emerald-50/20 shadow-md'
                    : 'border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                onClick={() => {
                  if (isFeasible) setSelectedBundleId(bundle.id);
                }}
              >
                <div className="space-y-4">
                  {/* Card Header Tag & Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant={isSelected ? 'emerald' : 'slate'} size="sm">
                        {bundle.tag}
                      </Badge>

                      {isFeasible ? (
                        <Badge variant="emerald" size="sm">
                          Within Budget
                        </Badge>
                      ) : (
                        <Badge variant="rose" size="sm">
                          Over Budget ({formatCurrencyINR(bundle.amountOverBudget)} above)
                        </Badge>
                      )}
                    </div>

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
                    variant={isSelected ? 'primary' : isFeasible ? 'outline' : 'ghost'}
                    size="sm"
                    className="w-full"
                    disabled={!isFeasible}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFeasible) setSelectedBundleId(bundle.id);
                    }}
                  >
                    {isSelected ? 'Bundle Selected' : isFeasible ? 'Select This Bundle' : `Over Budget (${formatCurrencyINR(bundle.amountOverBudget)} above)`}
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
              Ready to simulate long-term ROI or generate your Finance-ready Climate Action Passport.
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
              Simulate Outcomes
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
                Eligible for capital subsidy under SAMARTH scheme and interest subvention for MSME green upgrades.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
