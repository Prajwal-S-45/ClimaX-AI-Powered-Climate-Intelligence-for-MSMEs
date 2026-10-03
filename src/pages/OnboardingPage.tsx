import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Building2, MapPin, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input, Select, Stepper } from '../components/ui';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    { id: 1, title: 'Enterprise Profile', description: 'Basic business info' },
    { id: 2, title: 'Energy & Utility Baseline', description: 'Power source & spend' },
    { id: 3, title: 'Risk & Compliance Context', description: 'Export markets & hazard zone' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">MSME Onboarding & Baseline Setup</h1>
            <p className="text-xs text-slate-500">
              Configure enterprise metrics to generate tailored climate risk ratings and intervention options.
            </p>
          </div>
        </div>
      </div>

      {/* Stepper Progress */}
      <Card className="py-4 px-6">
        <Stepper steps={steps} currentStep={currentStep} onStepClick={(idx) => setCurrentStep(idx)} />
      </Card>

      {/* Form Content Steps */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Enterprise Profile & Operational Location</CardTitle>
            <CardDescription>Enter registered entity information for geographic hazard mapping.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Registered Business Name"
              defaultValue="Apex Precision Engineering Solutions"
              leftIcon={<Building2 className="w-4 h-4" />}
            />
            <Select
              label="Industry Sector"
              defaultValue="auto"
              options={[
                { value: 'auto', label: 'Auto Components Manufacturing' },
                { value: 'textile', label: 'Textiles & Garment Processing' },
                { value: 'pharma', label: 'Chemicals & Pharmaceuticals' },
                { value: 'food', label: 'Food Processing & Cold Storage' },
              ]}
            />
            <Input
              label="City / Industrial Hub"
              defaultValue="Coimbatore"
              leftIcon={<MapPin className="w-4 h-4" />}
            />
            <Select
              label="State / Region"
              defaultValue="tn"
              options={[
                { value: 'tn', label: 'Tamil Nadu' },
                { value: 'mh', label: 'Maharashtra' },
                { value: 'gj', label: 'Gujarat' },
                { value: 'ka', label: 'Karnataka' },
              ]}
            />
            <Input
              label="Annual Financial Turnover (INR)"
              defaultValue="3,50,00,000"
              helperText="Used for ROI feasibility scaling"
            />
            <Input
              label="Total Employees"
              defaultValue="45"
              type="number"
            />
          </CardContent>
          <CardFooter>
            <Button variant="ghost" disabled>Previous</Button>
            <Button variant="primary" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Energy Profile
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Energy Baseline & Utility Footprint</CardTitle>
            <CardDescription>Assess primary fuel and grid electricity metrics for Scope 1 & 2 baseline.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary Power Source"
              defaultValue="grid_diesel"
              leftIcon={<Zap className="w-4 h-4" />}
              options={[
                { value: 'grid_diesel', label: 'State Grid Electricity + Diesel Genset' },
                { value: 'grid_only', label: 'State Grid Electricity Only' },
                { value: 'rooftop_solar', label: 'Grid + Existing Solar PV' },
              ]}
            />
            <Input
              label="Average Monthly Electricity Bill (INR)"
              defaultValue="1,85,000"
            />
            <Input
              label="Connected Load (kW / kVA)"
              defaultValue="120 kW"
            />
            <Input
              label="Annual Diesel Consumption (Liters)"
              defaultValue="4,200 L"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setCurrentStep(0)}>Previous</Button>
            <Button variant="primary" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Risk Context
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Risk & Supply Chain Exposure</CardTitle>
            <CardDescription>Determine CBAM export tariffs and local climate vulnerability factors.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Export Exposure (EU / CBAM Markets)"
              defaultValue="yes_indirect"
              options={[
                { value: 'yes_indirect', label: 'Indirect Supplier to EU Exporter Tier-1' },
                { value: 'yes_direct', label: 'Direct Exporter to EU / USA' },
                { value: 'domestic', label: '100% Domestic Indian Market' },
              ]}
            />
            <Select
              label="Historic Climate Vulnerability"
              defaultValue="monsoon"
              options={[
                { value: 'monsoon', label: 'High Monsoon Waterlogging & Flood Risk' },
                { value: 'heat', label: 'Extreme Summer Heat & Grid Tripping' },
                { value: 'water_scarcity', label: 'Industrial Water Tanker Dependence' },
              ]}
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setCurrentStep(1)}>Previous</Button>
            <Button variant="primary" onClick={handleNext} rightIcon={<ShieldCheck className="w-4 h-4" />}>
              Complete & Generate Dashboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
