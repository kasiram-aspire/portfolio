import React from 'react';
import { Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="lg:ml-[300px] bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-10 px-6 sm:px-10 border-t border-slate-200 dark:border-slate-900 text-center text-xs transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-3">
        <p className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
          <span>Designed & Handcrafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by</span>
          <span className="text-slate-900 dark:text-white font-bold">{profile.name}</span>
        </p>

        <p className="text-slate-500 text-[11px]">
          © {new Date().getFullYear()} {profile.name}. All rights reserved. High-fidelity pixel-perfect responsive portfolio built with React 19, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};
