import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, MapPin, Calendar, CheckCircle2, ChevronRight, Download, ExternalLink, Sparkles } from 'lucide-react';
import { TimelineItem, AccentColor } from '../types';
import { generateKasiramResumePdf } from '../utils/generatePdf';

interface ResumeProps {
  education: TimelineItem[];
  experience: TimelineItem[];
  accentColor: AccentColor;
  userName: string;
}

export const Resume: React.FC<ResumeProps> = ({ education, experience, accentColor, userName }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-500';
      case 'violet': return 'bg-purple-500';
      case 'rose': return 'bg-rose-500';
      case 'amber': return 'bg-amber-500';
      default: return 'bg-sky-500';
    }
  };

  const getAccentText = () => {
    switch (accentColor) {
      case 'emerald': return 'text-emerald-500';
      case 'violet': return 'text-purple-500';
      case 'rose': return 'text-rose-500';
      case 'amber': return 'text-amber-500';
      default: return 'text-sky-500';
    }
  };

  const getAccentBorder = () => {
    switch (accentColor) {
      case 'emerald': return 'border-emerald-500';
      case 'violet': return 'border-purple-500';
      case 'rose': return 'border-rose-500';
      case 'amber': return 'border-amber-500';
      default: return 'border-sky-500';
    }
  };

  return (
    <section id="resume" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              Resume
            </h2>
            <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
              A chronological timeline of my academic background, career progression, major organizational accomplishments, and core engineering responsibilities.
            </p>
          </div>
          <button
            onClick={generateKasiramResumePdf}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all active:scale-95 shrink-0 ${getAccentBg()} hover:opacity-95`}
          >
            <Download className="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </button>
        </div>

        {/* 2 Column Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Education
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 ml-3">
              {education.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 ${getAccentBorder()} shadow-sm group-hover:scale-125 transition-transform`} />

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 my-2 text-xs font-semibold">
                      <span className={`px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200`}>
                        {item.period}
                      </span>
                      <span className="text-slate-500 italic">{item.organization}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${getAccentText()} hover:underline`}
                    >
                      <span>View Key Highlights</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Professional Experience
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 ml-3">
              {experience.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 ${getAccentBorder()} shadow-sm group-hover:scale-125 transition-transform`} />

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 my-2 text-xs font-semibold">
                      <span className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {item.period}
                      </span>
                      <span className="text-slate-500 italic">{item.organization}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.skillsUsed.map((sk) => (
                        <span key={sk} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-200/70 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${getAccentText()} hover:underline`}
                    >
                      <span>View Key Achievements</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {selectedItem.period}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {selectedItem.organization}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className={`w-3.5 h-3.5 ${getAccentText()}`} />
                Key Accomplishments & Impact
              </h4>
              <ul className="space-y-2">
                {selectedItem.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 ${getAccentText()} shrink-0 mt-0.5`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs ${getAccentBg()} text-white shadow-md active:scale-95 transition-transform`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
