import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClimate } from '../context/ClimateContext';
import {
  ShieldAlert,
  Flame,
  CloudRain,
  Droplets,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  DollarSign,
  ShieldCheck,
  Building2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  RiskBadge,
  Badge,
  Button,
  ProgressBar
} from '../components/ui';
import { OnboardingFormData } from '../types';
import { formatCurrencyINR } from '../utils/helpers';

const defaultProfile: OnboardingFormData = {
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
  availableBudgetINR: 100000,
  preferredHorizonYears: 5,
  maxPaybackPeriodYears: 4,
};

const radarData = [
  { subject: 'Heat', score: 85, fullMark: 100 },
  { subject: 'Flood', score: 60, fullMark: 100 },
  { subject: 'Water', score: 80, fullMark: 100 },
  { subject: 'Energy', score: 78, fullMark: 100 },
  { subject: 'Supply Chain', score: 65, fullMark: 100 },
];

export const ClimateRiskPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, budget } = useClimate();

  const businessName = profile.businessName || 'Shakti Precision Components';
  const location = profile.location || 'Bengaluru, Karnataka';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm" icon={<ShieldAlert className="w-3.5 h-3.5" />}>
              Business Vulnerability Analysis
            </Badge>
            <span className="text-xs text-slate-500 font-medium">{location} Site</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Climate Risk & Business Impact Matrix
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Translating physical climate hazards into financial liabilities and operational priorities for {businessName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/interventions')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Optimize Interventions
          </Button>
        </div>
      </div>

      {/* Top Grid: Exposure Index & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exposure Score Card */}
        <Card className="lg:col-span-1 space-y-4 bg-gradient-to-b from-white to-amber-50/30 border-amber-200/80 shadow-xs flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="amber" size="sm">
                Facility Vulnerability
              </Badge>
              <RiskBadge severity="High" />
            </div>
            <CardTitle className="text-base text-slate-900 pt-2">
              Prototype Climate Exposure Index
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Illustrative score generated from the demo business profile and selected risk factors.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">74</span>
              <span className="text-sm font-bold text-slate-500">/ 100</span>
              <span className="ml-auto text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                High Risk Exposure
              </span>
            </div>

            <ProgressBar value={74} color="amber" showValue={false} />

            <div className="p-3 bg-white/80 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Primary Drivers</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Driven by high summer heat exposure in {location}, groundwater table depletion requiring tanker dependency, and DISCOM grid electricity tariff escalation.
              </p>
            </div>
          </CardContent>

          <CardFooter className="pt-2 border-t border-amber-100">
            <span className="text-[11px] text-slate-400 font-mono">
              Index Model: CAP-VULN-2026-v1.2
            </span>
          </CardFooter>
        </Card>

        {/* Radar Chart Card */}
        <Card className="lg:col-span-2 space-y-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              5-Vector Climate Hazard Profile
            </CardTitle>
            <CardDescription>
              Comparative exposure across physical, financial, and operational hazard dimensions
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={12} tickLine={false} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                  <Radar
                    name="Hazard Score"
                    dataKey="score"
                    stroke="#d97706"
                    fill="#f59e0b"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Flow Section: Risk -> Business Impact */}
      <Card className="space-y-4 border-slate-200 bg-slate-50/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            Risk → Business Impact Flow
          </CardTitle>
          <CardDescription>
            How climate hazards translate directly into financial liabilities and required responses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                1. Climate Hazard
              </span>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 pt-1">
                <Flame className="w-4 h-4 text-amber-600" />
                Extreme Heat & Power Surges
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Summer ambient temperatures exceed 40°C in industrial zone.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                2. Operational Impact
              </span>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 pt-1">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                Machine Overheating & Stress
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Air compressors trip frequently; factory floor thermal discomfort lowers output.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                3. Financial Impact
              </span>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 pt-1">
                <DollarSign className="w-4 h-4 text-rose-600" />
                ₹18,000/mo Power Spike
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Increased cooling power tariffs and scrap rate losses during trips.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                4. Recommended Action
              </span>
              <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cool Roof Coating & HVLS
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Reflective roof paint & HVLS fans cut ambient temperature by 5°C with 1.5yr payback.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Four Core Risk Modules */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Detailed Business Risk Modules
          </h3>
          <p className="text-xs text-slate-500">
            Evaluating the four core climate hazards affecting MSME operations in {location}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1: Extreme Heat */}
          <Card hoverable className="space-y-4 border-l-4 border-l-amber-500">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">1. Extreme Heat</CardTitle>
                    <span className="text-xs text-slate-400 font-medium">Physical Thermal Exposure</span>
                  </div>
                </div>
                <RiskBadge severity="High" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">Why It Matters:</span>
                <p className="text-slate-600 leading-relaxed">
                  Rising ambient summer temperatures strain factory cooling equipment and increase power draw during peak DISCOM pricing hours.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Potential Business Impact:</span>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  <li>Higher cooling power demand & DISCOM peak tariff surge charges</li>
                  <li>Worker productivity degradation & thermal comfort concerns</li>
                  <li>Machinery overheating, air compressor trips & shutdown risks</li>
                  <li>Accelerated equipment insulation degradation & maintenance costs</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-800 block">Recommended Responses:</span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="emerald" size="sm">Cool Roof Coating</Badge>
                  <Badge variant="emerald" size="sm">HVLS Fan Ventilation</Badge>
                  <Badge variant="emerald" size="sm">Efficient AC Retrofits</Badge>
                  <Badge variant="emerald" size="sm">Heat-Aware Shift Schedules</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 2: Flood Exposure */}
          <Card hoverable className="space-y-4 border-l-4 border-l-blue-500">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">2. Flood Exposure</CardTitle>
                    <span className="text-xs text-slate-400 font-medium">Inundation & Storm Drainage</span>
                  </div>
                </div>
                <RiskBadge severity="Medium" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">Why It Matters:</span>
                <p className="text-slate-600 leading-relaxed">
                  Heavy monsoon downpours and inadequate municipal storm drainage cause localized workshop inundation and logistics roadblocks.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Potential Business Impact:</span>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  <li>Raw material inventory & finished goods moisture damage</li>
                  <li>Factory floor access blockages & staff absenteeism during inundation</li>
                  <li>Inbound supplier & outbound customer logistics delivery delays</li>
                  <li>Emergency water pumping & post-monsoon cleanup expense</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-800 block">Recommended Responses:</span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="blue" size="sm">Elevated Pallet Racks (&gt;30cm)</Badge>
                  <Badge variant="blue" size="sm">Perimeter Flood Barriers</Badge>
                  <Badge variant="blue" size="sm">Site Storm Drain Channels</Badge>
                  <Badge variant="blue" size="sm">Contingency Logistics Agreements</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: Water Stress */}
          <Card hoverable className="space-y-4 border-l-4 border-l-teal-500">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">3. Water Stress</CardTitle>
                    <span className="text-xs text-slate-400 font-medium">Groundwater Table & Supply</span>
                  </div>
                </div>
                <RiskBadge severity="High" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">Why It Matters:</span>
                <p className="text-slate-600 leading-relaxed">
                  Industrial zone groundwater table depletion forces reliance on volatile private water tanker suppliers.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Potential Business Impact:</span>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  <li>Volatile water tanker procurement costs (₹120–180 per kilolitre)</li>
                  <li>Production line slowdowns during peak summer tanker shortages</li>
                  <li>Groundwater extraction regulatory limits & compliance fees</li>
                  <li>Hard water scaling damage to boilers & cooling towers</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-800 block">Recommended Responses:</span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="teal" size="sm">Rainwater Harvesting Tank</Badge>
                  <Badge variant="teal" size="sm">Closed-Loop Cooling Recycling</Badge>
                  <Badge variant="teal" size="sm">Low-Flow Fixtures & Aerators</Badge>
                  <Badge variant="teal" size="sm">Dual Line Water Storage</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 4: Energy Vulnerability */}
          <Card hoverable className="space-y-4 border-l-4 border-l-rose-500">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">4. Energy Vulnerability</CardTitle>
                    <span className="text-xs text-slate-400 font-medium">DISCOM Tariffs & Genset Cost</span>
                  </div>
                </div>
                <RiskBadge severity="High" />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">Why It Matters:</span>
                <p className="text-slate-600 leading-relaxed">
                  High grid DISCOM tariffs combined with expensive diesel generator power during unannounced grid outages.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Potential Business Impact:</span>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  <li>Expensive diesel generator fuel expense (₹28–34/kWh)</li>
                  <li>DISCOM power factor penalty surcharges & peak demand fines</li>
                  <li>Scope 2 carbon emissions tax liability under EU CBAM mandates</li>
                  <li>Operating margin erosion from recurring tariff hikes</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-800 block">Recommended Responses:</span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="rose" size="sm">Rooftop Solar PV Installation</Badge>
                  <Badge variant="rose" size="sm">IE4 Super-Premium Motors</Badge>
                  <Badge variant="rose" size="sm">APFC Capacitor Bank</Badge>
                  <Badge variant="rose" size="sm">IoT Smart Sub-Metering</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Prominent CTA Banner */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl border-0 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Mitigation Action Ready
            </Badge>
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Turn Identified Risks Into Bankable Interventions
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use our Intervention Optimizer to select cost-effective green upgrades tailored for {businessName} within your {formatCurrencyINR(budget)} budget constraint.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/interventions')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md"
            >
              Optimize Interventions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
