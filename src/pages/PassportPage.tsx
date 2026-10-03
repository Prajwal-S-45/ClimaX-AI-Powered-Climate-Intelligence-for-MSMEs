import React from 'react';
import { FileCheck2, Download, Share2, ShieldCheck, QrCode, Building2, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { Card, Badge, Button, StatusBadge, RiskBadge } from '../components/ui';
import { mockMSMEProfile } from '../data/mockData';

export const PassportPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Climate Action Passport</h1>
            <p className="text-xs text-slate-500">
              Verifiable green credit profile for banks, SIDBI low-interest loans, and OEM buyers.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<Share2 className="w-3.5 h-3.5" />}>
            Share QR Link
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Audit PDF
          </Button>
        </div>
      </div>

      {/* Main Passport Document Container */}
      <Card className="p-8 space-y-6 border-2 border-emerald-500/40 shadow-lg relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Top Watermark / Badge */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="emerald" size="md" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}>
                Verified Climate Action Passport
              </Badge>
              <StatusBadge status="Verified" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{mockMSMEProfile.businessName}</h2>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {mockMSMEProfile.sector}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {mockMSMEProfile.city}, {mockMSMEProfile.state}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col items-center justify-center space-y-1">
            <QrCode className="w-12 h-12 text-slate-800" />
            <span className="text-[10px] font-mono text-slate-500">CAP-2026-8891</span>
          </div>
        </div>

        {/* Passport Audit Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Passport Reg ID</span>
            <span className="text-xs font-mono font-bold text-slate-900">CAP-IN-2026-8891</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Climate Risk Rating</span>
            <RiskBadge severity="Low" />
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">CO₂ Abatement Target</span>
            <span className="text-sm font-extrabold text-emerald-700">80 Tons / Year</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Banking Eligibility</span>
            <span className="text-xs font-bold text-teal-700">Priority Green Loan Ready</span>
          </div>
        </div>

        {/* Approved Interventions Summary */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Verified Intervention Commitments</h3>
          <div className="space-y-2">
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">50 kWp Rooftop Solar PV Installation</span>
              </div>
              <span className="font-bold text-slate-900">₹22,00,000 Capex</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">IE4 Super-Premium Efficiency Motors Upgrade</span>
              </div>
              <span className="font-bold text-slate-900">₹4,50,000 Capex</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
