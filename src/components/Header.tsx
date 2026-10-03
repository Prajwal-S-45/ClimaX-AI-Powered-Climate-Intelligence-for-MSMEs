import React, { useState, useEffect } from 'react';
import { Menu, Building2, MapPin, Bell, ShieldCheck, ChevronDown, Play, RotateCcw } from 'lucide-react';
import { OnboardingFormData } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
}

const defaultHeaderProfile = {
  businessName: 'Shakti Precision Components',
  location: 'Bengaluru, Karnataka',
  industry: 'Manufacturing',
};

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [profile, setProfile] = useState<Partial<OnboardingFormData>>(defaultHeaderProfile);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('msme_climate_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setIsDemoMode(Boolean(parsed.isDemoMode !== false));
      }
    } catch (e) {
      console.error('Error reading header profile state:', e);
    }
  }, []);

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
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl hover:border-slate-300 transition-colors">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {profile.businessName || 'Shakti Precision Components'}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {profile.location || 'Bengaluru, Karnataka'}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{profile.industry || 'Manufacturing'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Demo Mode Indicator */}
        {isDemoMode && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold shadow-2xs">
            <Play className="w-3 h-3 text-purple-600 fill-current" />
            <span>Demo Mode Active</span>
          </div>
        )}

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
