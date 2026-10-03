import React from 'react';
import { Menu, Building2, MapPin, Bell, ShieldCheck, ChevronDown } from 'lucide-react';
import { mockMSMEProfile } from '../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-xs">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Enterprise Context Dropdown Badge */}
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl hover:border-slate-300 transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {mockMSMEProfile.businessName}
              </h4>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {mockMSMEProfile.city}, {mockMSMEProfile.state}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{mockMSMEProfile.sector}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Verification Status Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified MSME Profile</span>
        </div>

        {/* Notification Bell */}
        <button
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};
