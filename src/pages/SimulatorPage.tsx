import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, CloudRain, ArrowRight, RefreshCw, FileCheck2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Card, MetricCard, Slider, Select, ChartCard, Button, Badge } from '../components/ui';
import { formatCurrencyINR } from '../utils/helpers';

export const SimulatorPage: React.FC = () => {
  const [budget, setBudget] = useState<number>(2650000);
  const [horizon, setHorizon] = useState<string>('5');
  const [tariffEscalation, setTariffEscalation] = useState<number>(5);

  const years = Number(horizon);
  const annualSavingsBase = 675000 * (budget / 2650000);
  const annualCO2Base = 80 * (budget / 2650000);

  const chartData = Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const factor = Math.pow(1 + tariffEscalation / 100, i);
    const savings = Math.round((annualSavingsBase * yr * factor) / 100000);
    const co2 = Math.round(annualCO2Base * yr);
    return {
      year: `Year ${yr}`,
      savingsINR: savings,
      co2Abated: co2,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">What-if Financial & Carbon Simulator</h1>
            <p className="text-xs text-slate-500">
              Interactive scenario planning tool for financial institution presentation and ROI verification.
            </p>
          </div>
        </div>

        <Link to="/passport">
          <Button variant="primary" size="sm" rightIcon={<FileCheck2 className="w-4 h-4" />}>
            Generate Climate Action Passport
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <Card className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Simulation Variables</h3>
            <Badge variant="emerald" size="sm">
              Live Model
            </Badge>
          </div>

          <Slider
            label="Capital Budget Allocation (INR)"
            value={budget}
            min={500000}
            max={5000000}
            step={100000}
            onChange={(val) => setBudget(val)}
            valueFormat={(val) => formatCurrencyINR(val)}
            minLabel="₹5 Lakhs"
            maxLabel="₹50 Lakhs"
          />

          <Select
            label="Simulation Horizon"
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            options={[
              { value: '3', label: '3 Years (Short-term Debt Horizon)' },
              { value: '5', label: '5 Years (Medium-term Capex Horizon)' },
              { value: '10', label: '10 Years (Asset Life Cycle Horizon)' },
            ]}
          />

          <Slider
            label="Annual Power Tariff Escalation (%)"
            value={tariffEscalation}
            min={2}
            max={10}
            step={1}
            onChange={(val) => setTariffEscalation(val)}
            valueFormat={(val) => `${val}% / year`}
          />

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setBudget(2650000);
              setHorizon('5');
              setTariffEscalation(5);
            }}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset Default Scenario
          </Button>
        </Card>

        {/* Analytical Outputs & Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title={`Cumulative ${horizon}-Yr Savings`}
              value={`₹${chartData[chartData.length - 1]?.savingsINR || 0} Lakhs`}
              subtitle="Electricity tariff savings & fuel offset"
              accentColor="emerald"
              icon={<DollarSign className="w-5 h-5" />}
            />
            <MetricCard
              title={`Cumulative ${horizon}-Yr Carbon Abatement`}
              value={`${chartData[chartData.length - 1]?.co2Abated || 0} Tons CO₂`}
              subtitle="Scope 1 & Scope 2 combined offset"
              accentColor="teal"
              icon={<CloudRain className="w-5 h-5" />}
            />
          </div>

          <ChartCard
            title="Cumulative Financial Savings vs CO₂ Offset"
            subtitle="Projected benefits calculated across selected investment timeframe"
          >
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="savingsINR" name="Savings (₹ Lakhs)" fill="#059669" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="co2Abated" name="CO₂ Offset (Tons)" fill="#0d9488" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
