import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  Code,
  FileText,
  Briefcase,
  ChevronDown,
  Mail,
  Menu,
  X,
  Linkedin,
  Github,
  Settings,
  Sun,
  Moon,
  MessageSquare,
  Award
} from 'lucide-react';
import { ProfileData, AccentColor } from '../types';

interface SidebarProps {
  profile: ProfileData;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCustomize: () => void;
  accentColor: AccentColor;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  activeSection,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  onOpenCustomize,
  accentColor,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close mobile sidebar on navigate
  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Dynamic color classes based on accent
  const getAccentColorClass = () => {
    switch (accentColor) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-400 hover:text-emerald-300';
      case 'violet':
        return 'text-purple-400 bg-purple-500/10 border-purple-400 hover:text-purple-300';
      case 'rose':
        return 'text-rose-400 bg-rose-500/10 border-rose-400 hover:text-rose-300';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-400 hover:text-amber-300';
      default:
        return 'text-sky-400 bg-sky-500/10 border-sky-400 hover:text-sky-300';
    }
  };

  const getAccentHoverBg = () => {
    switch (accentColor) {
      case 'emerald': return 'hover:bg-emerald-500';
      case 'violet': return 'hover:bg-purple-500';
      case 'rose': return 'hover:bg-rose-500';
      case 'amber': return 'hover:bg-amber-500';
      default: return 'hover:bg-sky-500';
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
        className={`lg:hidden fixed top-5 right-5 z-50 p-3 rounded-full text-white shadow-2xl transition-transform active:scale-95 ${
          accentColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' :
          accentColor === 'violet' ? 'bg-purple-600 hover:bg-purple-500' :
          accentColor === 'rose' ? 'bg-rose-600 hover:bg-rose-500' :
          accentColor === 'amber' ? 'bg-amber-600 hover:bg-amber-500' :
          'bg-sky-600 hover:bg-sky-500'
        }`}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[300px] bg-slate-900 dark:bg-[#040b14] text-slate-100 dark:text-slate-200 z-40 flex flex-col justify-between p-6 transition-colors duration-300 transition-transform ease-in-out border-r border-slate-800 dark:border-slate-800/60 shadow-2xl overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mt-4 mb-6">
            <div className="relative group cursor-pointer" onClick={() => handleNavClick('hero')} title="Available for work">
              <img
                src={'assets/swd_kasi.png'}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-full object-cover object-[60%_center] border-4 border-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.75)]"
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white mt-4 font-sans">
              {profile.name}
            </h1>

            {/* Social Icons Bar */}
            <div className="flex items-center justify-center gap-2.5 mt-4">
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 dark:bg-[#141c2b] text-slate-300 transition-all ${getAccentHoverBg()} hover:text-white shadow-sm hover:scale-110`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 dark:bg-[#141c2b] text-slate-300 transition-all ${getAccentHoverBg()} hover:text-white shadow-sm hover:scale-110`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-8">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-base transition-all group font-medium ${
                        isActive
                          ? `${getAccentColorClass()} font-semibold shadow-inner`
                          : 'text-slate-300 dark:text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-[#141c2b]/80'
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? accentColor === 'emerald' ? 'text-emerald-400' :
                              accentColor === 'violet' ? 'text-purple-400' :
                              accentColor === 'rose' ? 'text-rose-400' :
                              accentColor === 'amber' ? 'text-amber-400' :
                              'text-sky-400'
                            : 'text-slate-400 group-hover:text-white'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}

              {/* Dropdown Menu Item Example matching design */}
              <li>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base text-slate-300 dark:text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-[#141c2b]/80 transition-all group font-medium"
                  >
                    <div className="flex items-center gap-3.5">
                      <Award className="w-5 h-5 text-slate-400 group-hover:text-white" />
                      <span>Experience</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-sky-400' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-slate-700 dark:border-slate-800 pl-3">
                      <button
                        onClick={() => handleNavClick('resume')}
                        className="block w-full text-left py-1.5 px-2 text-sm text-slate-300 dark:text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        Education History
                      </button>
                      <button
                        onClick={() => handleNavClick('resume')}
                        className="block w-full text-left py-1.5 px-2 text-sm text-slate-300 dark:text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        Work Experience
                      </button>
                      <button
                        onClick={() => handleNavClick('portfolio')}
                        className="block w-full text-left py-1.5 px-2 text-sm text-slate-300 dark:text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        Featured Projects
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer & Actions */}
        <div className="pt-6 border-t border-slate-800/80 mt-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 text-xs text-slate-200 dark:text-slate-400 hover:text-white transition-colors bg-slate-800 dark:bg-[#141c2b] px-3 py-1.5 rounded-full border border-slate-700 dark:border-slate-700/50"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={onOpenCustomize}
              className="p-2 text-slate-300 dark:text-slate-400 hover:text-sky-400 bg-slate-800 dark:bg-[#141c2b] hover:bg-slate-700 dark:hover:bg-[#1d283c] rounded-full transition-all border border-slate-700 dark:border-slate-700/50"
              title="Customize Portfolio & Switch Profile"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} <span className="text-slate-200 dark:text-slate-300 font-medium">{profile.name}</span>
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-600 mt-0.5">
              Crafted with React & Tailwind CSS
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
