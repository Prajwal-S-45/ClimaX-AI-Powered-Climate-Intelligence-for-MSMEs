import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck,
  ShieldAlert,
  Building2,
  MapPin,
  FileCheck2,
  CheckCircle2,
  DollarSign,
  Flame,
  QrCode,
  ArrowLeft,
  ExternalLink,
  Award
} from 'lucide-react';
import { Card, Badge, Button, RiskBadge } from '../components/ui';
import { defaultProfile, getBundlesForBudget } from '../utils/climateEngine';
import { formatCurrencyINR } from '../utils/helpers';

export const VerificationPage: React.FC = () => {
  const { passportId } = useParams<{ passportId: string }>();
  const [searchParams] = useSearchParams();
  const bundleParam = searchParams.get('bundle');
  const budgetParam = searchParams.get('budget');

  // Valid passport ID check (case insensitive)
  const isValidPassport = passportId?.toUpperCase() === 'CAP-2026-0001';

  // Demo values for standalone verification matching encoded passport URL identity
  const demoProfile = defaultProfile;
  const targetBudget = budgetParam && !isNaN(Number(budgetParam)) ? Number(budgetParam) : 100000;
  const allBundles = getBundlesForBudget(targetBudget);
  const demoBundle =
    (bundleParam ? allBundles.find((b) => b.id === bundleParam) : null) ||
    allBundles.find((b) => b.id === 'bundle-a') ||
    allBundles[0] ||
    null;

  const verificationUrl = `${window.location.origin}/verify/${passportId}${window.location.search}`;

  if (!isValidPassport) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 space-y-6 text-center">
        <Card className="p-8 md:p-12 space-y-6 border-2 border-rose-200 bg-white shadow-xl rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <Badge variant="rose" size="md">
              Verification Error
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Passport Not Found
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              The passport identification number <code className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{passportId || 'UNKNOWN'}</code> could not be located in the public verification ledger.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 text-left space-y-1">
            <span className="font-bold text-slate-700 block">Possible Reasons:</span>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
              <li>The URL link may contain a typo or invalid passport ID string.</li>
              <li>The project document has not yet been issued or registered to the public ledger.</li>
              <li>The reference link was modified or revoked by the issuer.</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home Page
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!demoBundle) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 space-y-6 text-center">
        <Card className="p-8 md:p-12 space-y-6 border-2 border-amber-200 bg-white shadow-xl rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <Badge variant="amber" size="md">
              Verification Data Error
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Project Record Unavailable
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              The target decarbonization project bundle could not be found or loaded.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home Page
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Top Banner Notice */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Public Verification Ledger</span>
              <Badge variant="emerald" size="sm">Demo – Ready for Review</Badge>
            </div>
            <h1 className="text-base font-bold text-white">
              Official Climate Action Passport Certificate
            </h1>
          </div>
        </div>

        <Link to="/passport">
          <Button variant="outline" size="sm" className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 text-xs" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
            Open Full App Passport
          </Button>
        </Link>
      </div>

      {/* Main Certificate Card */}
      <Card className="p-6 sm:p-8 space-y-8 border-2 border-emerald-600/30 shadow-xl bg-gradient-to-b from-white via-slate-50/20 to-white rounded-3xl relative overflow-hidden">
        {/* Top Trim */}
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 rounded-t-xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-6" />

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="emerald" size="md" icon={<Award className="w-4 h-4 text-emerald-600" />}>
                DEMO – READY FOR REVIEW
              </Badge>
              <Badge variant="purple" size="sm">
                Status: Ready for Review
              </Badge>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {demoProfile.businessName}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Official Decarbonization & Climate Resilience Public Registry Record
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {demoProfile.industry}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {demoProfile.location}
              </span>
            </div>
          </div>

          {/* QR & ID Block */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col items-center justify-center space-y-2 border-dashed">
            <QRCodeSVG
              value={verificationUrl}
              size={64}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
              className="w-16 h-16"
            />
            <div className="text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Verified Passport ID</span>
              <span className="text-xs font-mono font-extrabold text-emerald-700">CAP-2026-0001</span>
            </div>
          </div>
        </div>

        {/* Business Profile */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            1. Registered Enterprise Profile
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Business Name</span>
              <span className="font-bold text-slate-900">{demoProfile.businessName}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Industry Sector</span>
              <span className="font-bold text-slate-900">{demoProfile.industry}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Location / Site</span>
              <span className="font-bold text-slate-900">{demoProfile.location}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block text-[11px]">Workforce Size</span>
              <span className="font-bold text-slate-900">{demoProfile.numberOfEmployees} Employees</span>
            </div>
          </div>
        </div>

        {/* Selected Project */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            2. Selected Decarbonization Project
          </h3>

          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Project Title</span>
                <h4 className="text-base font-extrabold text-white">
                  {demoBundle.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total Investment Capex</span>
                <span className="text-lg font-extrabold text-emerald-400">
                  {formatCurrencyINR(demoBundle.metrics.totalInvestment)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block">Included Interventions ({demoBundle.items.length}):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {demoBundle.items.map((item, idx) => (
                  <div key={item.id} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="font-semibold text-white block">{idx + 1}. {item.name}</span>
                    <span className="text-[11px] text-slate-400">Capex: {formatCurrencyINR(item.estimatedInvestment)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 text-slate-400">
              <span>Implementation Target: <strong className="text-white">6 Weeks (Installation Only)</strong></span>
              <span>Projected Payback: <strong className="text-emerald-400">{demoBundle.metrics.avgPayback} Years</strong></span>
            </div>
          </div>
        </div>

        {/* Financial & Environmental Outlook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              3. Verified Financial Outlook
            </h3>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Expected Annual Operating Savings:</span>
                <span className="font-extrabold text-emerald-700 text-sm">{formatCurrencyINR(demoBundle.metrics.annualSavings)} / yr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated Payback Period:</span>
                <span className="font-bold text-slate-900">{demoBundle.metrics.avgPayback} Years</span>
              </div>
              <div className="flex justify-between items-center border-t border-emerald-200/80 pt-2">
                <span className="text-slate-700 font-semibold">5-Year Cumulative Savings:</span>
                <span className="font-extrabold text-slate-900 text-base">{formatCurrencyINR(demoBundle.metrics.annualSavings * 5)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
              <Flame className="w-4 h-4 text-teal-600" />
              4. Verified Carbon Reduction Impact
            </h3>

            <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated CO₂ Reduction:</span>
                <span className="font-extrabold text-teal-700 text-sm">{demoBundle.metrics.co2Reduction} tCO₂e / year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Estimated Water Savings:</span>
                <span className="font-bold text-slate-900">
                  {demoBundle.metrics.waterSavings > 0 ? `${demoBundle.metrics.waterSavings.toLocaleString()} L/yr` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-teal-200/80 pt-2">
                <span className="text-slate-700 font-semibold">Risks Addressed:</span>
                <div className="flex gap-1 flex-wrap">
                  {demoBundle.metrics.risks.map((r) => (
                    <Badge key={r} variant="teal" size="sm">{r}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Public Audit Ledger Items */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            5. Public Evidence Checklist & Proof Ledger
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
                <span>Supplier Tax Invoice & Installation Receipt</span>
              </div>
              <Badge variant="slate" size="sm">Pending Upload</Badge>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 text-xs space-y-1">
          <span className="font-bold text-slate-700 block">Notice & Model Disclaimer</span>
          <p className="text-[11px] leading-relaxed">
            Illustrative estimate for prototype demonstration. This public verification page displays recorded project metadata registered on the Climate Action Passport platform. It does not constitute an official government guarantee or certified financial return.
          </p>
        </div>
      </Card>
    </div>
  );
};
