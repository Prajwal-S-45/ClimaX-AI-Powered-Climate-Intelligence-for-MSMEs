import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, ArrowRight, ShieldCheck, Factory, CloudRain, Shield } from 'lucide-react';
import { Card, RiskBadge, ProgressBar, Badge, Button } from '../components/ui';
import { mockClimateRisks, mockMSMEProfile } from '../data/mockData';

export const ClimateRiskPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Climate Risk & Vulnerability Analysis</h1>
            <p className="text-xs text-slate-500">
              Location-specific physical hazards and regulatory transition risks for {mockMSMEProfile.businessName} ({mockMSMEProfile.city}).
            </p>
          </div>
        </div>

        <Link to="/interventions">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Proceed to Intervention Optimizer
          </Button>
        </Link>
      </div>

      {/* Summary Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Overall Hazard Rating: 74 / 100 (High Vulnerability)</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            Your manufacturing facility faces primary exposure to North-East monsoon urban flooding in Coimbatore and European Union CBAM emissions export compliance requirements from Tier-1 Automotive OEMs.
          </p>
        </div>
      </div>

      {/* Risk Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockClimateRisks.map((risk) => (
          <Card key={risk.id} hoverable className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="slate" size="sm">
                  {risk.category} Category
                </Badge>
                <RiskBadge severity={risk.severity} />
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug flex items-start gap-2">
                {risk.category === 'Physical' ? (
                  <CloudRain className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                ) : (
                  <Factory className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                )}
                {risk.riskTitle}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">{risk.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Financial Impact Severity</span>
                <span className="text-slate-900 font-bold">{risk.financialImpactScore} / 100</span>
              </div>
              <ProgressBar
                value={risk.financialImpactScore}
                color={risk.severity === 'Critical' ? 'rose' : risk.severity === 'High' ? 'amber' : 'teal'}
                showValue={false}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
