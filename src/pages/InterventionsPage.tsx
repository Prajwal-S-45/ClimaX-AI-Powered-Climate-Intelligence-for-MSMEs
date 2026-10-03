import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sliders, CheckCircle2, Plus, ArrowRight, DollarSign, Zap, Info } from 'lucide-react';
import { Card, Badge, Button, ProgressBar, Modal } from '../components/ui';
import { mockInterventions } from '../data/mockData';
import { formatCurrencyINR } from '../utils/helpers';

export const InterventionsPage: React.FC = () => {
  const [interventions, setInterventions] = useState(mockInterventions);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setInterventions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const totalCapex = interventions.filter((i) => i.selected).reduce((acc, i) => acc + i.estimatedCostINR, 0);
  const totalSavings = interventions.filter((i) => i.selected).reduce((acc, i) => acc + i.annualSavingsINR, 0);
  const totalCO2 = interventions.filter((i) => i.selected).reduce((acc, i) => acc + i.co2ReductionTonsPerYear, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Intervention Optimizer</h1>
            <p className="text-xs text-slate-500">
              Select clean technology interventions tailored to capital budget constraints.
            </p>
          </div>
        </div>

        <Link to="/simulator">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Simulate Outcomes in What-if Tool
          </Button>
        </Link>
      </div>

      {/* Selected Interventions Portfolio Summary Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Active Portfolio Selection</span>
          <h3 className="text-xl font-bold text-white">Combined Intervention Portfolio</h3>
          <p className="text-xs text-slate-400">
            {interventions.filter((i) => i.selected).length} interventions selected for implementation.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <span className="text-slate-400 block">Total Capex Required</span>
            <span className="text-base font-extrabold text-white">{formatCurrencyINR(totalCapex)}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Annual Cost Savings</span>
            <span className="text-base font-extrabold text-emerald-400">{formatCurrencyINR(totalSavings)}</span>
          </div>
          <div>
            <span className="text-slate-400 block">CO₂ Reduction</span>
            <span className="text-base font-extrabold text-teal-400">{totalCO2} Tons / yr</span>
          </div>
        </div>
      </div>

      {/* Interventions Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interventions.map((item) => (
          <Card
            key={item.id}
            hoverable
            className={`space-y-4 flex flex-col justify-between transition-all ${
              item.selected ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20' : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="teal" size="sm">
                  {item.category}
                </Badge>
                {item.selected ? (
                  <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                    Selected
                  </Badge>
                ) : (
                  <Badge variant="slate" size="sm">
                    Available
                  </Badge>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>

              <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Capex:</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(item.estimatedCostINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Annual Energy Savings:</span>
                  <span className="font-bold text-emerald-700">{formatCurrencyINR(item.annualSavingsINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CO₂ Avoidance:</span>
                  <span className="font-bold text-teal-700">{item.co2ReductionTonsPerYear} Tons / yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Simple Payback Period:</span>
                  <span className="font-semibold text-slate-800">{item.paybackPeriodYears} Years</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveModal(item.id)}
                leftIcon={<Info className="w-3.5 h-3.5" />}
              >
                Details
              </Button>
              <Button
                variant={item.selected ? 'outline' : 'primary'}
                size="sm"
                onClick={() => toggleSelect(item.id)}
                leftIcon={item.selected ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3.5 h-3.5" />}
              >
                {item.selected ? 'Deselect' : 'Select'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title="Intervention Technical Overview"
          subtitle="Equipment specifications and subsidy options"
          footer={
            <Button variant="primary" onClick={() => setActiveModal(null)}>
              Close Specifications
            </Button>
          }
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              This intervention qualifies for MSME Green Technology Subsidies under Ministry of MSME and SIDBI low-interest credit schemes.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-slate-800">
                <span>SIDBI Interest Subvention:</span>
                <span className="text-emerald-700">2.5% Rate Subsidy</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800">
                <span>Installation Duration:</span>
                <span>2 - 4 Weeks</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
