import React from 'react';
import { BarChart3, UploadCloud, CheckCircle2, Clock, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { Card, Button, StatusBadge, ProgressBar, Badge } from '../components/ui';

export const ImpactPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Impact Verification & Evidence Tracking</h1>
            <p className="text-xs text-slate-500">
              Audit actual utility bill logs against predicted financial savings and CO₂ abatement milestones.
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" leftIcon={<UploadCloud className="w-4 h-4" />}>
          Upload Utility Bill Evidence
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Drop Zone Card */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Upload Monthly Electricity & Fuel Evidence</h3>
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-colors bg-slate-50/50">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-600">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">Drag & drop monthly TANGEDCO utility bills or solar inverter logs</p>
              <p className="text-[11px] text-slate-400">PDF, CSV, PNG up to 15MB for OCR evidence verification</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Browse Files
            </Button>
          </div>
        </Card>

        {/* Verification Status Ledger */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Verified Evidence Audit Ledger</h3>
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Audited
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Q1 2026 Solar Generation Log</span>
                <span className="text-[11px] text-slate-500">Verified on Oct 2, 2026 • 14,200 kWh</span>
              </div>
              <StatusBadge status="Verified" />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Motor Efficiency Replacement Invoice</span>
                <span className="text-[11px] text-slate-500">Uploaded Sep 28, 2026 • Under Bank Audit</span>
              </div>
              <StatusBadge status="In Progress" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
