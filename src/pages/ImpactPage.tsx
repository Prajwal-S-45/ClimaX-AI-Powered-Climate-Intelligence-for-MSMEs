import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Image,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Zap,
  Droplets,
  Flame,
  DollarSign,
  Plus
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
import { Card, Button, StatusBadge, Badge, Modal } from '../components/ui';
import { formatCurrencyINR } from '../utils/helpers';

interface EvidenceItem {
  id: string;
  name: string;
  category: 'electricity bill' | 'water bill' | 'equipment invoice' | 'installation photograph';
  fileName: string;
  uploadDate: string;
  status: 'Pending' | 'Uploaded' | 'Verified';
  fileSize: string;
}

const initialEvidenceList: EvidenceItem[] = [
  {
    id: 'ev-1',
    name: 'Monthly Electricity Utility Bill',
    category: 'electricity bill',
    fileName: 'tangco_electricity_bill_sept2026.pdf',
    uploadDate: 'Oct 01, 2026',
    status: 'Verified',
    fileSize: '2.4 MB',
  },
  {
    id: 'ev-2',
    name: 'Municipal Water Tanker Receipts',
    category: 'water bill',
    fileName: 'water_utility_receipts_q3.pdf',
    uploadDate: 'Sep 28, 2026',
    status: 'Verified',
    fileSize: '1.8 MB',
  },
  {
    id: 'ev-3',
    name: 'IE4 Motor Tax Invoice & Warranty',
    category: 'equipment invoice',
    fileName: 'ie4_motor_tax_invoice.pdf',
    uploadDate: 'Sep 25, 2026',
    status: 'Uploaded',
    fileSize: '3.1 MB',
  },
  {
    id: 'ev-4',
    name: 'Cool Roof Installation Site Photo',
    category: 'installation photograph',
    fileName: 'cool_roof_coating_site.jpg',
    uploadDate: 'Sep 20, 2026',
    status: 'Uploaded',
    fileSize: '4.5 MB',
  },
];

const EVIDENCE_STORAGE_KEY = 'msme_impact_evidence_CAP-2026-0001';

export const ImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(EVIDENCE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved evidence list:', e);
    }
    return initialEvidenceList;
  });
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<EvidenceItem['category']>('electricity bill');
  const [mockFileName, setMockFileName] = useState<string>('');

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Sync evidenceList across open tabs when updated in another tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === EVIDENCE_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setEvidenceList(parsed);
          }
        } catch (err) {
          console.error('Error parsing evidence list from storage event:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sample scenario dataset
  const reductionComparison = [
    { metric: 'Energy Reduction', predicted: 18, actual: 16, variance: -2 },
    { metric: 'Water Reduction', predicted: 12, actual: 10, variance: -2 },
    { metric: 'CO₂ Reduction', predicted: 15, actual: 13, variance: -2 },
  ];

  const operatingMetrics = [
    {
      label: 'Electricity Cost (INR/mo)',
      baseline: 78000,
      predicted: 63960, // -18%
      actual: 65520, // -16%
      unit: 'INR',
    },
    {
      label: 'Energy Consumption (kWh/mo)',
      baseline: 8200,
      predicted: 6724, // -18%
      actual: 6888, // -16%
      unit: 'kWh',
    },
    {
      label: 'Water Consumption (L/mo)',
      baseline: 85000,
      predicted: 74800, // -12%
      actual: 76500, // -10%
      unit: 'Litres',
    },
    {
      label: 'CO₂ Emissions (tCO₂e/mo)',
      baseline: 14.2,
      predicted: 12.07, // -15%
      actual: 12.35, // -13%
      unit: 'tCO₂e',
    },
    {
      label: 'Operating Cost (INR/mo)',
      baseline: 113000,
      predicted: 94920,
      actual: 97180,
      unit: 'INR',
    },
  ];

  const handleMockUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedFileName = mockFileName.trim();
    if (!trimmedFileName) return;

    setIsUploading(true);
    setUploadError(null);

    // Read latest stored records to support multi-tab additions without dropping records
    let currentList = evidenceList;
    try {
      const saved = localStorage.getItem(EVIDENCE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          currentList = parsed;
        }
      }
    } catch (e) {
      console.error('Error reading current evidence list:', e);
    }

    // Duplicate check on filename or reference against latest list
    const isDuplicate = currentList.some(
      (item) => item.fileName.toLowerCase() === trimmedFileName.toLowerCase() ||
                item.name.toLowerCase() === trimmedFileName.toLowerCase()
    );

    if (isDuplicate) {
      setUploadError('Evidence already added.');
      setIsUploading(false);
      return;
    }

    const newItem: EvidenceItem = {
      id: `ev-${Date.now()}`,
      name: `${selectedCategory.toUpperCase()} Evidence`,
      category: selectedCategory,
      fileName: trimmedFileName,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Uploaded',
      fileSize: '1.5 MB',
    };

    const updatedList = [newItem, ...currentList.filter((item) => item.id !== newItem.id)];
    try {
      localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(updatedList));
      setEvidenceList(updatedList);
      setMockFileName('');
      setIsUploading(false);
      setShowUploadModal(false);
    } catch (err) {
      console.error('Error saving evidence list to localStorage:', err);
      setUploadError('Failed to save evidence record. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="blue" size="sm" icon={<BarChart3 className="w-3.5 h-3.5" />}>
              Post-Implementation Audit
            </Badge>
            <span className="text-xs text-slate-500 font-medium font-mono">Proof Ledger v2026</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Impact Verification
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Compare the project's predicted outcomes with actual outcomes after implementation.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowUploadModal(true)}
          leftIcon={<UploadCloud className="w-4 h-4" />}
        >
          Upload Evidence File
        </Button>
      </div>

      {/* State Switcher (BEFORE vs AFTER IMPLEMENTATION) */}
      <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-md">
        <button
          onClick={() => setActiveTab('before')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'before'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          BEFORE IMPLEMENTATION (Baseline)
        </button>
        <button
          onClick={() => setActiveTab('after')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'after'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          AFTER IMPLEMENTATION (Audited)
        </button>
      </div>

      {/* Sample Scenario Metrics Comparison Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Operational Performance: Predicted vs Actual Outcomes
          </h3>
          <Badge variant="teal" size="sm">
            Illustrative Demo Scenario
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {operatingMetrics.map((item) => {
            const displayVal =
              activeTab === 'before'
                ? item.unit === 'INR'
                  ? formatCurrencyINR(item.baseline)
                  : `${item.baseline} ${item.unit}`
                : item.unit === 'INR'
                ? formatCurrencyINR(item.actual)
                : `${item.actual} ${item.unit}`;

            return (
              <Card key={item.label} className="p-4 space-y-2 border-slate-200 bg-white">
                <span className="text-[11px] font-semibold text-slate-500 block">{item.label}</span>
                <div className="text-lg font-extrabold text-slate-900">{displayVal}</div>

                <div className="text-[11px] space-y-0.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>Predicted:</span>
                    <span className="font-semibold text-slate-700">
                      {item.unit === 'INR' ? formatCurrencyINR(item.predicted) : `${item.predicted} ${item.unit}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Actual:</span>
                    <span className="font-bold text-emerald-700">
                      {item.unit === 'INR' ? formatCurrencyINR(item.actual) : `${item.actual} ${item.unit}`}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Predicted vs Actual Reductions & Variance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sample Scenario Reductions & Variance Table */}
        <Card className="p-6 space-y-5 lg:col-span-1 border-slate-200 bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Reductions Variance Analysis</h3>
            <Badge variant="amber" size="sm">
              -2% Variance Gap
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            {reductionComparison.map((r) => (
              <div key={r.metric} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{r.metric}</span>
                  <span className="text-amber-700">{r.variance}% Variance</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 block">Predicted</span>
                    <span className="font-extrabold text-slate-800 text-sm">-{r.predicted}%</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 block">Actual</span>
                    <span className="font-extrabold text-emerald-700 text-sm">-{r.actual}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Recharts Predicted vs Actual Bar Chart */}
        <Card className="p-6 space-y-4 lg:col-span-2 border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Predicted vs Actual Reductions (%)</h3>
              <p className="text-xs text-slate-500">Visual comparison across energy, water, and emissions targets.</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reductionComparison} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="metric" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  formatter={(value: any) => [`${value}% Reduction`, 'Target']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="predicted" name="Predicted Reduction (%)" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" name="Actual Reduction (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* "Next Climate Action" Recommendation Card */}
      <Card className="p-6 bg-amber-50/80 border border-amber-200 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold">Next Climate Action</h3>
        </div>

        <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-semibold">
          Energy savings are 2% below the initial estimate (16% actual vs 18% predicted). Review equipment operating hours and maintenance efficiency to optimize baseline performance.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs">
          <div className="p-3 bg-white/90 rounded-xl border border-amber-200 space-y-1 flex-1">
            <span className="font-bold text-slate-900 block">Action 1: Air Leakage Audit</span>
            <p className="text-[11px] text-slate-600">Inspect pneumatic air lines for micro-leaks in compressor system.</p>
          </div>
          <div className="p-3 bg-white/90 rounded-xl border border-amber-200 space-y-1 flex-1">
            <span className="font-bold text-slate-900 block">Action 2: Cool Roof Recoating Check</span>
            <p className="text-[11px] text-slate-600">Ensure high-SRI coating surfaces are free of dust buildup after monsoon.</p>
          </div>
        </div>
      </Card>

      {/* Evidence Section & Upload Mock Documents */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Audit Evidence Checklist & Proof Ledger ({evidenceList.length})
            </h3>
            <p className="text-xs text-slate-500">
              Upload utility bills, equipment tax invoices, and site photos for finance documentation verification.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUploadModal(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Evidence
          </Button>
        </div>

        {/* Evidence Items List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidenceList.map((item) => {
            const getStatusBadge = (status: EvidenceItem['status']) => {
              switch (status) {
                case 'Verified':
                  return <Badge variant="teal" size="sm">Demo Verified</Badge>;
                case 'Uploaded':
                  return <Badge variant="blue" size="sm">Uploaded</Badge>;
                case 'Pending':
                default:
                  return <StatusBadge status="Pending" />;
              }
            };

            return (
              <Card key={item.id} className="p-4 space-y-3 border-slate-200 bg-white flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold">
                      {item.category === 'installation photograph' ? (
                        <Image className="w-5 h-5 text-purple-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                      <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{item.fileName}</span>
                    </div>
                  </div>

                  {getStatusBadge(item.status)}
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-100 font-mono">
                  <span>Category: {item.category}</span>
                  <span>Uploaded: {item.uploadDate} • {item.fileSize}</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Manual audit & evidence proof ledger. Automated AI bill OCR validation available in production tier.</span>
          <span className="font-semibold text-slate-700">Audit Status: Active Ledger</span>
        </div>
      </div>

      {/* Upload Evidence Modal */}
      {showUploadModal && (
        <Modal
          isOpen={showUploadModal}
          onClose={() => {
            setShowUploadModal(false);
            setUploadError(null);
          }}
          title="Upload Audit Evidence File"
          subtitle="Add utility bills, equipment invoices, or site photographs"
        >
          <form onSubmit={handleMockUpload} className="space-y-4 text-xs">
            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="evidence-category-select" className="font-bold text-slate-800 block">Select Document Category:</label>
              <select
                id="evidence-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="electricity bill">Electricity Bill (Monthly DISCOM / TANGEDCO log)</option>
                <option value="water bill">Water Bill (Municipal / Tanker invoice)</option>
                <option value="equipment invoice">Equipment Invoice (Motor / Solar tax invoice)</option>
                <option value="installation photograph">Installation Photograph (Cool roof / site photo)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="evidence-file-name-input" className="font-bold text-slate-800 block">Mock File Name / Reference:</label>
              <input
                id="evidence-file-name-input"
                type="text"
                placeholder="e.g. electric_bill_oct2026.pdf"
                value={mockFileName}
                onChange={(e) => {
                  setMockFileName(e.target.value);
                  setUploadError(null);
                }}
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
              <UploadCloud className="w-8 h-8 text-emerald-600" />
              <span className="text-slate-700 font-semibold">Simulated File Upload</span>
              <span className="text-[11px] text-slate-400">Stores metadata & local preview in prototype session</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadError(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={isUploading || !mockFileName.trim()}
                isLoading={isUploading}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                Confirm Upload
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
