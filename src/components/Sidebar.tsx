import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  Sliders,
  TrendingUp,
  FileCheck2,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Globe,
  ClipboardList,
  Play
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Climate Risk', path: '/climate-risk', icon: ShieldAlert },
  { name: 'Intervention Optimizer', path: '/interventions', icon: Sliders },
  { name: 'What-if Simulator', path: '/simulator', icon: TrendingUp },
  { name: 'Climate Passport', path: '/passport', icon: FileCheck2 },
  { name: 'Impact Verification', path: '/impact', icon: BarChart3 },
];

const secondaryNavItems = [
  { name: 'Overview Landing', path: '/', icon: Globe },
  { name: 'MSME Onboarding', path: '/onboarding', icon: ClipboardList },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Treatment */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight block leading-tight">
                Climate Action Passport
              </span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                MSME Resilience
              </span>
            </div>
          </NavLink>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Core Platform</span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                <Play className="w-2.5 h-2.5 fill-current" /> Demo Flow
              </span>
            </div>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Setup
            </div>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Financial & Trust Institution Badge Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="rounded-xl p-3 bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-slate-900">Finance Documentation Readiness</p>
              <p className="text-[11px] text-slate-500">Structured Project Documentation</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
