import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Skill, SkillCategory, AccentColor } from '../types';

interface SkillsProps {
  skills: Skill[];
  accentColor: AccentColor;
}

export const Skills: React.FC<SkillsProps> = ({ skills, accentColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const categories: { id: SkillCategory; label: string }[] = [
    { id: 'all', label: 'All Skills' },
    { id: 'backend', label: 'Backend & Cloud' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-500';
      case 'violet': return 'bg-purple-500';
      case 'rose': return 'bg-rose-500';
      case 'amber': return 'bg-amber-500';
      default: return 'bg-sky-500';
    }
  };

  const getAccentActiveTab = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20';
      case 'violet': return 'bg-purple-600 text-white shadow-lg shadow-purple-500/20';
      case 'rose': return 'bg-rose-600 text-white shadow-lg shadow-rose-500/20';
      case 'amber': return 'bg-amber-600 text-white shadow-lg shadow-amber-500/20';
      default: return 'bg-sky-600 text-white shadow-lg shadow-sky-500/20';
    }
  };

  return (
    <section id="skills" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Skills
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
            A comprehensive overview of my technical proficiency across frontend development, backend API design, database architecture, and user interface craftsmanship.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                selectedCategory === cat.id
                  ? getAccentActiveTab()
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Progress Bars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name + index} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-200">
                <span className="uppercase tracking-wider">{skill.name}</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">{skill.percentage}%</span>
              </div>
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${getAccentBg()} rounded-full shadow-sm`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
