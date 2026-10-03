import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Users,
  Zap,
  Droplets,
  Fuel,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Flame,
  CloudRain,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  FileText,
  AlertCircle,
  HelpCircle,
  Factory
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Select,
  Stepper,
  Badge,
  RiskBadge
} from '../components/ui';
import { OnboardingFormData } from '../types';
import { formatCurrencyINR } from '../utils/helpers';

const initialFormData: OnboardingFormData = {
  businessName: '',
  businessType: 'Private Limited',
  industry: 'Manufacturing',
  location: '',
  yearsOperating: '',
  numberOfEmployees: '',
  monthlyElectricityBillINR: '',
  monthlyWaterConsumptionLitres: '',
  monthlyFuelExpenseINR: '',
  operatingHoursPerDay: '',
  workingDaysPerMonth: '',
  climateConcerns: [],
  availableBudgetINR: '',
  preferredHorizonYears: 5,
  maxPaybackPeriodYears: 4,
};

const demoBusinessData: OnboardingFormData = {
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
};

const climateConcernOptions = [
  {
    id: 'Extreme heat',
    label: 'Extreme Heat',
    description: 'High summer temperatures causing machine overheating and cooling power spikes.',
    icon: Flame,
    color: 'amber',
  },
  {
    id: 'Flooding',
    label: 'Flooding & Inundation',
    description: 'Monsoon waterlogging risk to raw material storage and factory floor access.',
    icon: CloudRain,
    color: 'blue',
  },
  {
    id: 'Water scarcity',
    label: 'Water Scarcity & Tankers',
    description: 'Dependence on external tanker supplies for cooling towers and processing.',
    icon: Droplets,
    color: 'teal',
  },
  {
    id: 'Rising energy costs',
    label: 'Rising Energy Costs',
    description: 'Grid electricity tariff increases and diesel generator reliance during power cuts.',
    icon: Zap,
    color: 'rose',
  },
  {
    id: 'Supply-chain disruption',
    label: 'Supply-Chain Disruption',
    description: 'Logistics delays due to severe weather events impacting supplier deliveries.',
    icon: Sliders,
    color: 'purple',
  },
  {
    id: 'Waste generation',
    label: 'Waste Generation & Disposal',
    description: 'High scrap rates and expensive hazardous/industrial waste handling.',
    icon: Factory,
    color: 'slate',
  },
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDemoApplied, setIsDemoApplied] = useState<boolean>(false);

  const steps = [
    { id: 1, title: 'Business Profile', description: 'Entity & scale' },
    { id: 2, title: 'Resource Profile', description: 'Energy & water' },
    { id: 3, title: 'Climate Exposure', description: 'Hazard selection' },
    { id: 4, title: 'Financial Constraints', description: 'Budget & payback' },
    { id: 5, title: 'Review & Confirm', description: 'Generate passport' },
  ];

  const handleInputChange = (field: keyof OnboardingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const toggleClimateConcern = (concernId: string) => {
    setFormData((prev) => {
      const exists = prev.climateConcerns.includes(concernId);
      const updated = exists
        ? prev.climateConcerns.filter((item) => item !== concernId)
        : [...prev.climateConcerns, concernId];
      return { ...prev, climateConcerns: updated };
    });
    if (errors.climateConcerns) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.climateConcerns;
        return updated;
      });
    }
  };

  const applyDemoData = () => {
    setFormData(demoBusinessData);
    setErrors({});
    setIsDemoApplied(true);
    setTimeout(() => setIsDemoApplied(false), 4000);
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.location.trim()) newErrors.location = 'Location (City, State) is required';
      if (!formData.yearsOperating || Number(formData.yearsOperating) <= 0) {
        newErrors.yearsOperating = 'Enter valid years of operation';
      }
      if (!formData.numberOfEmployees || Number(formData.numberOfEmployees) <= 0) {
        newErrors.numberOfEmployees = 'Enter valid employee count';
      }
    } else if (stepIndex === 1) {
      if (formData.monthlyElectricityBillINR === '' || Number(formData.monthlyElectricityBillINR) < 0) {
        newErrors.monthlyElectricityBillINR = 'Enter electricity bill';
      }
      if (formData.monthlyWaterConsumptionLitres === '' || Number(formData.monthlyWaterConsumptionLitres) < 0) {
        newErrors.monthlyWaterConsumptionLitres = 'Enter water consumption';
      }
      if (formData.monthlyFuelExpenseINR === '' || Number(formData.monthlyFuelExpenseINR) < 0) {
        newErrors.monthlyFuelExpenseINR = 'Enter fuel expense';
      }
      if (
        formData.operatingHoursPerDay === '' ||
        Number(formData.operatingHoursPerDay) <= 0 ||
        Number(formData.operatingHoursPerDay) > 24
      ) {
        newErrors.operatingHoursPerDay = 'Enter operating hours (1-24)';
      }
      if (
        formData.workingDaysPerMonth === '' ||
        Number(formData.workingDaysPerMonth) <= 0 ||
        Number(formData.workingDaysPerMonth) > 31
      ) {
        newErrors.workingDaysPerMonth = 'Enter working days (1-31)';
      }
    } else if (stepIndex === 2) {
      if (formData.climateConcerns.length === 0) {
        newErrors.climateConcerns = 'Select at least one climate exposure concern';
      }
    } else if (stepIndex === 3) {
      if (formData.availableBudgetINR === '' || Number(formData.availableBudgetINR) <= 0) {
        newErrors.availableBudgetINR = 'Enter available investment budget';
      }
      if (!formData.maxPaybackPeriodYears || Number(formData.maxPaybackPeriodYears) <= 0) {
        newErrors.maxPaybackPeriodYears = 'Select maximum acceptable payback period';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProfile = () => {
    if (!validateStep(0) || !validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill all required fields across all steps before submitting.');
      return;
    }

    // Save profile data to localStorage
    try {
      localStorage.setItem('msme_climate_profile', JSON.stringify(formData));
      localStorage.setItem('msme_profile_completed', 'true');
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
              MSME Climate Assessment Wizard
            </Badge>
            <span className="text-xs text-slate-400 font-medium">~2–3 Minute Setup</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Climate Action Profile Onboarding
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Provide baseline operational details to generate a custom climate vulnerability score and intervention roadmap.
          </p>
        </div>

        {/* Demo Preset Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={applyDemoData}
            leftIcon={<Sparkles className="w-4 h-4 text-emerald-600" />}
            className="bg-emerald-50/70 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
          >
            Try Demo Business
          </Button>
        </div>
      </div>

      {/* Demo Applied Feedback Banner */}
      {isDemoApplied && (
        <div className="p-3.5 rounded-2xl bg-emerald-500 text-white flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Pre-populated demo business details for <strong>Shakti Precision Components</strong> (Bengaluru).</span>
          </div>
          <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-mono">Demo Ready</span>
        </div>
      )}

      {/* Stepper Progress */}
      <Card className="py-4 px-4 sm:px-6 shadow-xs">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(idx) => {
            if (idx < currentStep || validateStep(currentStep)) {
              setCurrentStep(idx);
            }
          }}
        />
      </Card>

      {/* STEP 1: Business Profile */}
      {currentStep === 0 && (
        <Card className="space-y-6">
          <CardHeader>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <Building2 className="w-5 h-5" />
            </div>
            <CardTitle>Step 1: Business Profile & Operational Scale</CardTitle>
            <CardDescription>
              Enter entity details and geographic location for regional hazard mapping.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Business Name *"
                placeholder="e.g. Shakti Precision Components"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                error={errors.businessName}
                leftIcon={<Building2 className="w-4 h-4" />}
              />

              <Select
                label="Business Type *"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                options={[
                  { value: 'Private Limited', label: 'Private Limited (Pvt Ltd)' },
                  { value: 'Partnership', label: 'Partnership Firm' },
                  { value: 'Proprietary Firm', label: 'Sole Proprietorship' },
                  { value: 'LLP', label: 'Limited Liability Partnership (LLP)' },
                  { value: 'MSME Registered Unit', label: 'MSME Registered Enterprise' },
                ]}
              />

              <Select
                label="Industry Sector *"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                options={[
                  { value: 'Manufacturing', label: 'Manufacturing' },
                  { value: 'Food & Beverage', label: 'Food & Beverage' },
                  { value: 'Retail', label: 'Retail' },
                  { value: 'Textile', label: 'Textile' },
                  { value: 'Logistics', label: 'Logistics' },
                  { value: 'Auto Service', label: 'Auto Service' },
                  { value: 'Agriculture / Food Processing', label: 'Agriculture / Food Processing' },
                  { value: 'Other', label: 'Other' },
                ]}
              />

              <Input
                label="Location (City, State) *"
                placeholder="e.g. Bengaluru, Karnataka"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                error={errors.location}
                leftIcon={<MapPin className="w-4 h-4" />}
              />

              <Input
                label="Years Operating *"
                type="number"
                placeholder="e.g. 8"
                value={formData.yearsOperating}
                onChange={(e) => handleInputChange('yearsOperating', e.target.value ? Number(e.target.value) : '')}
                error={errors.yearsOperating}
                leftIcon={<Calendar className="w-4 h-4" />}
              />

              <Input
                label="Number of Employees *"
                type="number"
                placeholder="e.g. 28"
                value={formData.numberOfEmployees}
                onChange={(e) => handleInputChange('numberOfEmployees', e.target.value ? Number(e.target.value) : '')}
                error={errors.numberOfEmployees}
                leftIcon={<Users className="w-4 h-4" />}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="ghost" disabled>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Resource Profile
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: Resource Profile */}
      {currentStep === 1 && (
        <Card className="space-y-6">
          <CardHeader>
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <CardTitle>Step 2: Resource & Utility Baseline</CardTitle>
            <CardDescription>
              Quantify monthly power, water, and fuel usage to compute Scope 1 & Scope 2 carbon footprint.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Monthly Electricity Bill (INR) *"
                type="number"
                placeholder="e.g. 78000"
                value={formData.monthlyElectricityBillINR}
                onChange={(e) => handleInputChange('monthlyElectricityBillINR', e.target.value ? Number(e.target.value) : '')}
                error={errors.monthlyElectricityBillINR}
                leftIcon={<Zap className="w-4 h-4" />}
                helperText="Average monthly DISCOM power expense"
              />

              <Input
                label="Monthly Water Consumption (Litres) *"
                type="number"
                placeholder="e.g. 85000"
                value={formData.monthlyWaterConsumptionLitres}
                onChange={(e) => handleInputChange('monthlyWaterConsumptionLitres', e.target.value ? Number(e.target.value) : '')}
                error={errors.monthlyWaterConsumptionLitres}
                leftIcon={<Droplets className="w-4 h-4" />}
                helperText="Municipal supply or tanker consumption"
              />

              <Input
                label="Monthly Fuel Expense (INR) *"
                type="number"
                placeholder="e.g. 22000"
                value={formData.monthlyFuelExpenseINR}
                onChange={(e) => handleInputChange('monthlyFuelExpenseINR', e.target.value ? Number(e.target.value) : '')}
                error={errors.monthlyFuelExpenseINR}
                leftIcon={<Fuel className="w-4 h-4" />}
                helperText="Diesel genset fuel or industrial heating fuel"
              />

              <Input
                label="Operating Hours Per Day *"
                type="number"
                placeholder="e.g. 10"
                value={formData.operatingHoursPerDay}
                onChange={(e) => handleInputChange('operatingHoursPerDay', e.target.value ? Number(e.target.value) : '')}
                error={errors.operatingHoursPerDay}
                leftIcon={<Clock className="w-4 h-4" />}
              />

              <Input
                label="Working Days Per Month *"
                type="number"
                placeholder="e.g. 26"
                value={formData.workingDaysPerMonth}
                onChange={(e) => handleInputChange('workingDaysPerMonth', e.target.value ? Number(e.target.value) : '')}
                error={errors.workingDaysPerMonth}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={handlePreviousStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Climate Exposure
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: Climate Exposure */}
      {currentStep === 2 && (
        <Card className="space-y-6">
          <CardHeader>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold mb-2">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <CardTitle>Step 3: Climate Exposure & Operational Vulnerability</CardTitle>
            <CardDescription>
              Select physical hazards and resource constraints impacting your enterprise location.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errors.climateConcerns && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.climateConcerns}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {climateConcernOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = formData.climateConcerns.includes(option.id);

                return (
                  <div
                    key={option.id}
                    onClick={() => toggleClimateConcern(option.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {option.label}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span
                        className={`text-[11px] font-semibold ${
                          isSelected ? 'text-emerald-700 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {isSelected ? '✓ Concern Selected' : '+ Click to select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={handlePreviousStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Financial Constraints
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 4: Financial Constraints */}
      {currentStep === 3 && (
        <Card className="space-y-6">
          <CardHeader>
            <div className="w-10 h-10 rounded-xl bg-navy-50 border border-slate-300 text-slate-800 flex items-center justify-center font-bold mb-2">
              <DollarSign className="w-5 h-5" />
            </div>
            <CardTitle>Step 4: Financial Constraints & Payback Target</CardTitle>
            <CardDescription>
              Define available capex budget to filter high-ROI, budget-constrained interventions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Available Investment Budget (INR) *"
                type="number"
                placeholder="e.g. 300000"
                value={formData.availableBudgetINR}
                onChange={(e) => handleInputChange('availableBudgetINR', e.target.value ? Number(e.target.value) : '')}
                error={errors.availableBudgetINR}
                leftIcon={<DollarSign className="w-4 h-4" />}
                helperText="Maximum upfront capex allocated for green upgrades"
              />

              <Select
                label="Preferred Investment Horizon *"
                value={String(formData.preferredHorizonYears)}
                onChange={(e) => handleInputChange('preferredHorizonYears', Number(e.target.value))}
                options={[
                  { value: '3', label: '3 Years (Short-term Debt Horizon)' },
                  { value: '5', label: '5 Years (Recommended Medium Term)' },
                  { value: '10', label: '10 Years (Asset Life Cycle Horizon)' },
                ]}
              />

              <Select
                label="Maximum Acceptable Payback Period *"
                value={String(formData.maxPaybackPeriodYears)}
                onChange={(e) => handleInputChange('maxPaybackPeriodYears', Number(e.target.value))}
                options={[
                  { value: '2', label: 'Within 2 Years (Aggressive ROI)' },
                  { value: '3', label: 'Within 3 Years (Fast Payback)' },
                  { value: '4', label: 'Within 4 Years (Standard Payback)' },
                  { value: '5', label: 'Within 5 Years (Extended Horizon)' },
                ]}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={handlePreviousStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Review Profile
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 5: Review & Confirm */}
      {currentStep === 4 && (
        <Card className="space-y-6 border-2 border-emerald-500/40 shadow-lg">
          <CardHeader>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold mb-2 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <CardTitle>Step 5: Review MSME Profile Summary</CardTitle>
            <CardDescription>
              Verify your enterprise baseline before generating your Climate Action Passport.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Section 1: Business */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  Business Profile
                </span>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)} className="text-xs text-emerald-700">
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Business Name:</span>
                  <span className="font-bold text-slate-900">{formData.businessName || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Industry Sector:</span>
                  <span className="font-semibold text-slate-800">{formData.industry}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Business Type:</span>
                  <span className="font-semibold text-slate-800">{formData.businessType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <span className="font-semibold text-slate-800">{formData.location || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Years Operating:</span>
                  <span className="font-semibold text-slate-800">{formData.yearsOperating} Years</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Employees:</span>
                  <span className="font-semibold text-slate-800">{formData.numberOfEmployees} Staff</span>
                </div>
              </div>
            </div>

            {/* Section 2: Resource Baseline */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-700" />
                  Resource & Utility Baseline
                </span>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-xs text-emerald-700">
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Monthly Electricity:</span>
                  <span className="font-bold text-slate-900">
                    {formData.monthlyElectricityBillINR ? formatCurrencyINR(Number(formData.monthlyElectricityBillINR)) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Monthly Water:</span>
                  <span className="font-semibold text-slate-800">
                    {formData.monthlyWaterConsumptionLitres ? `${Number(formData.monthlyWaterConsumptionLitres).toLocaleString()} Litres` : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Monthly Fuel:</span>
                  <span className="font-semibold text-slate-800">
                    {formData.monthlyFuelExpenseINR ? formatCurrencyINR(Number(formData.monthlyFuelExpenseINR)) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Operating Schedule:</span>
                  <span className="font-semibold text-slate-800">
                    {formData.operatingHoursPerDay} hrs/day, {formData.workingDaysPerMonth} days/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Climate Exposure */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  Selected Climate Exposure
                </span>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-xs text-emerald-700">
                  Edit
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.climateConcerns.length > 0 ? (
                  formData.climateConcerns.map((concern) => (
                    <Badge key={concern} variant="amber" size="md">
                      {concern}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No concerns selected</span>
                )}
              </div>
            </div>

            {/* Section 4: Financial Targets */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  Financial Constraints
                </span>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="text-xs text-emerald-700">
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Capex Investment Budget:</span>
                  <span className="font-extrabold text-emerald-700">
                    {formData.availableBudgetINR ? formatCurrencyINR(Number(formData.availableBudgetINR)) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Preferred Investment Horizon:</span>
                  <span className="font-semibold text-slate-800">{formData.preferredHorizonYears} Years</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Max Acceptable Payback:</span>
                  <span className="font-semibold text-slate-800">Within {formData.maxPaybackPeriodYears} Years</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={handlePreviousStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Previous Step
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmitProfile}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-md"
            >
              Generate Climate Profile
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
