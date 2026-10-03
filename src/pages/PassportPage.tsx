import React, { useState } from 'react';
import {
  FileCheck2,
  Share2,
  ShieldCheck,
  QrCode,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  DollarSign,
  Flame,
  AlertCircle,
  Printer,
  Check
} from 'lucide-react';
import { Card, Badge, Button, RiskBadge } from '../components/ui';
import { useClimate } from '../context/ClimateContext';
import { formatCurrencyINR } from '../utils/helpers';

export const PassportPage: React.FC = () => {
  const { profile, activeBundle } = useClimate();
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const passportUrl = 'https://climax-passport.app/verify/CAP-2026-0001';
    navigator.clipboard.writeText(passportUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Printable CSS overrides */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          nav, sidebar, header, .no-print {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      {/* Top Bar Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Climate Action Passport</h1>
            <p className="text-xs text-slate-500">
              Finance-ready digital project certificate for sustainability planning and supply chain audits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          >
            {copied ? 'Link Copied!' : 'Share Passport'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Download Passport (PDF)
          </Button>
        </div>
      </div>

      {/* Toast feedback when sharing link */}
      {copied && (
        <div className="no-print p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Passport Reference Link Copied: https://climax-passport.app/verify/CAP-2026-0001
          </span>
          <span className="text-[10px] text-emerald-600">Copied to Clipboard</span>
        </div>
      )}

      {/* Main Passport Certificate Frame */}
      <Card className="print-full-width p-8 space-y-8 border-2 border-emerald-600/30 shadow-xl relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white rounded-3xl">
        {/* Decorative Top Passport Security Trim */}
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 rounded-t-xl -mt-8 -mx-8 mb-6" />

        {/* SECTION 1: PASSPORT HEADER & OFFICIAL STAMP */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="emerald" size="md" icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}>
                CLIMATE ACTION PASSPORT
              </Badge>
              <Badge variant="purple" size="sm">
                Status: Ready for Review
              </Badge>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {profile.businessName || 'Shakti Precision Components'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Official Decarbonization & Climate Resilience Action Record
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {profile.industry}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {profile.location}
              </span>
            </div>
          </div>

          {/* QR Code & Passport Identifier Metadata Block */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col items-center justify-center space-y-2 border-dashed">
            <QrCode className="w-16 h-16 text-slate-900" />
            <div className="text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Passport ID</span>
              <span className="text-xs font-mono font-extrabold text-emerald-700">CAP-2026-0001</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: BUSINESS PROFILE */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            1. Business Profile Overview
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Business Name</span>
              <span className="font-bold text-slate-900">{profile.businessName}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Industry Sector</span>
              <span className="font-bold text-slate-900">{profile.industry}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Location / Site</span>
              <span className="font-bold text-slate-900">{profile.location}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Workforce Size</span>
              <span className="font-bold text-slate-900">{profile.numberOfEmployees} Employees</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: CLIMATE BASELINE */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600" />
            2. Climate Risk Baseline Rating
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[11px]">Extreme Heat Risk</span>
              <RiskBadge severity="High" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[11px]">Flood Exposure Risk</span>
              <RiskBadge severity="Medium" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[11px]">Water Stress Risk</span>
              <RiskBadge severity="High" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-400 block text-[11px]">Energy Vulnerability</span>
              <RiskBadge severity="High" />
            </div>
          </div>
        </div>

        {/* SECTION 4: SELECTED PROJECT */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            3. Selected Climate Intervention Project
          </h3>

          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Active Bundle Title</span>
                <h4 className="text-base font-extrabold text-white">
                  {activeBundle.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total Investment Required</span>
                <span className="text-lg font-extrabold text-emerald-400">
                  {formatCurrencyINR(activeBundle.metrics.totalInvestment)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block">Included Interventions ({activeBundle.items.length}):</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {activeBundle.items.map((item, idx) => (
                  <div key={item.id} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="font-semibold text-white block">{idx + 1}. {item.name}</span>
                    <span className="text-[11px] text-slate-400">Capex: {formatCurrencyINR(item.estimatedInvestment)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 text-slate-400">
              <span>Implementation Timeline Target: <strong className="text-white">6 Weeks</strong></span>
              <span>Projected Payback: <strong className="text-emerald-400">{activeBundle.metrics.avgPayback} Years</strong></span>
            </div>
          </div>
        </div>

        {/* SECTION 5: FINANCIAL OUTLOOK & CLIMATE IMPACT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Outlook */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              4. Financial Outlook
            </h3>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Expected Annual Operating Savings:</span>
                <span className="font-extrabold text-emerald-700 text-sm">{formatCurrencyINR(activeBundle.metrics.annualSavings)} / yr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated Payback Period:</span>
                <span className="font-bold text-slate-900">{activeBundle.metrics.avgPayback} Years</span>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-200/80 pt-2">
                <span className="text-slate-700 font-semibold">5-Year Cumulative Savings:</span>
                <span className="font-extrabold text-slate-900 text-base">{formatCurrencyINR(activeBundle.metrics.annualSavings * 5)}</span>
              </div>
            </div>
          </div>

          {/* Climate Impact */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              5. Climate & Environmental Impact
            </h3>

            <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated CO₂ Reduction:</span>
                <span className="font-extrabold text-teal-700 text-sm">{activeBundle.metrics.co2Reduction} tCO₂e / year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated Water Savings:</span>
                <span className="font-bold text-slate-900">
                  {activeBundle.metrics.waterSavings > 0 ? `${activeBundle.metrics.waterSavings.toLocaleString()} Litres / year` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-teal-200/80 pt-2">
                <span className="text-slate-700 font-semibold">Risks Addressed:</span>
                <div className="flex gap-1 flex-wrap">
                  {activeBundle.metrics.risks.map((r) => (
                    <Badge key={r} variant="teal" size="sm">{r}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: IMPLEMENTATION PLAN */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            6. Project Implementation Timeline (4 Phases)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Phase 1 — Assessment</span>
              <h5 className="font-bold text-slate-900">Site Baseline & Audit</h5>
              <p className="text-[11px] text-slate-500">Week 1 – Week 2</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Phase 2 — Procurement</span>
              <h5 className="font-bold text-slate-900">Vendor & Subsidies</h5>
              <p className="text-[11px] text-slate-500">Week 3 – Week 4</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Phase 3 — Installation</span>
              <h5 className="font-bold text-slate-900">Retrofit & Commissioning</h5>
              <p className="text-[11px] text-slate-500">Week 5 – Week 6</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Phase 4 — Verification</span>
              <h5 className="font-bold text-slate-900">Impact Metering Audit</h5>
              <p className="text-[11px] text-slate-500">Week 7+</p>
            </div>
          </div>
        </div>

        {/* SECTION 7: EVIDENCE CHECKLIST */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            7. Finance Verification Evidence Checklist
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">Business registration documents (GST, Udyam MSME Certificate)</span>
              </div>
              <Badge variant="teal" size="sm">Demo Record</Badge>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">Project quotation & vendor technology specifications</span>
              </div>
              <Badge variant="teal" size="sm">Demo Record</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                <span>Supplier Tax Invoice</span>
              </div>
              <Badge variant="slate" size="sm">Pending Upload</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                <span>On-site installation photographic evidence</span>
              </div>
              <Badge variant="slate" size="sm">Pending Upload</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                <span>Post-installation utility baseline bills & smart meter logs</span>
              </div>
              <Badge variant="slate" size="sm">Pending Upload</Badge>
            </div>
          </div>
        </div>

        {/* SECTION 8: DISCLAIMER NOTICE */}
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl space-y-1 text-slate-500 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <AlertCircle className="w-4 h-4 text-slate-500" />
            <span>Notice & Model Disclaimer</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Illustrative estimate for prototype demonstration. This document is an illustrative model export generated by the Climate Action Passport platform for planning and finance documentation submission. It does not constitute an official government certification, financial guarantee, or legal endorsement.
          </p>
        </div>
      </Card>
    </div>
  );
};
