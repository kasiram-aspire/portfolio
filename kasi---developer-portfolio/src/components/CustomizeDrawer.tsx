import React from 'react';
import { X, Palette, UserCheck, Sun, Moon, Sparkles, RefreshCw } from 'lucide-react';
import { AccentColor, ProfileData } from '../types';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfileKey: 'alex' | 'kasi';
  onSwitchProfile: (key: 'alex' | 'kasi') => void;
  accentColor: AccentColor;
  onChangeAccent: (color: AccentColor) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  profile: ProfileData;
  onUpdateTypedTitles: (titles: string[]) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  activeProfileKey,
  onSwitchProfile,
  accentColor,
  onChangeAccent,
  isDarkMode,
  onToggleTheme,
  profile,
  onUpdateTypedTitles,
}) => {
  if (!isOpen) return null;

  const accentColors: { id: AccentColor; name: string; bgClass: string }[] = [
    { id: 'emerald', name: 'Emerald Green', bgClass: 'bg-emerald-500' },
    { id: 'sky', name: 'Sky Blue', bgClass: 'bg-sky-500' },
    { id: 'violet', name: 'Electric Violet', bgClass: 'bg-purple-500' },
    { id: 'rose', name: 'Rose Pink', bgClass: 'bg-rose-500' },
    { id: 'amber', name: 'Amber Gold', bgClass: 'bg-amber-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xl font-bold font-sans">Portfolio Theme & Customization</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Profile Identity */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              Active Profile Identity
            </label>
            <div className="p-4 rounded-2xl border border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  KR
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">{profile.roleTitle}</p>
                </div>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase border border-emerald-500/30">
                Active
              </span>
            </div>
          </div>

          {/* Accent Color Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Accent Color Palette
            </label>
            <div className="grid grid-cols-5 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => onChangeAccent(color.id)}
                  title={color.name}
                  className={`h-10 rounded-xl ${color.bgClass} flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                    accentColor === color.id ? 'ring-4 ring-offset-2 ring-slate-900 dark:ring-white' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dark / Light Theme Toggle */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Display Mode
            </label>
            <button
              onClick={onToggleTheme}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-sm font-semibold transition-all"
            >
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>{isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}</span>
              </div>
              <span className="text-xs text-slate-400">Toggle</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-lg active:scale-95 transition-transform"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
