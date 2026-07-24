import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, FolderCheck, Code2, Cpu, Clock, Calendar, Globe, Phone, MapPin, GraduationCap, Mail, Briefcase, CheckCircle } from 'lucide-react';
import { ProfileData, AccentColor } from '../types';

interface AboutProps {
  profile: ProfileData;
  accentColor: AccentColor;
  onNavigate: (sectionId: string) => void;
}

// Counter Hook for animated numbers
const Counter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const About: React.FC<AboutProps> = ({ profile, accentColor, onNavigate }) => {
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

  return (
    <section id="about" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            About
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mt-4 max-w-4xl">
            {profile.bioLead}
          </p>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Image */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative group w-full max-w-md sm:max-w-lg lg:max-w-full">
              <div className={`absolute -inset-2 ${getAccentBg()} opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity`} />
              <img
                src={'assets/swd_kasi.png'}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="relative rounded-2xl object-cover object-[80%_center] w-full h-80 sm:h-[420px] lg:h-[450px] shadow-2xl border border-slate-200 dark:border-slate-800"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 text-white shadow-xl flex items-center gap-3">
                <CheckCircle className={`w-6 h-6 ${getAccentText()} shrink-0`} />
                <div>
                  <p className="text-xs font-semibold text-slate-200">{profile.roleTitle}</p>
                  <p className="text-[11px] text-slate-400">2.6+ Years Industry Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {profile.roleTitle}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed italic">
              "{profile.roleDescription}"
            </p>

            {/* 2-Column Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm pt-2">
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Birthday:</span>
                <span className="text-slate-600 dark:text-slate-300">{profile.details.birthday}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Age:</span>
                <span className="text-slate-600 dark:text-slate-300">{profile.details.age}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">College:</span>
                <span className="text-slate-600 dark:text-slate-300 truncate">{profile.details.college || profile.details.website}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Degree:</span>
                <span className="text-slate-600 dark:text-slate-300">{profile.details.degree}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Phone:</span>
                <span className="text-slate-600 dark:text-slate-300">{profile.details.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Email:</span>
                <span className="text-slate-600 dark:text-slate-300 truncate">{profile.details.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">City:</span>
                <span className="text-slate-600 dark:text-slate-300">{profile.details.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ChevronRight className={`w-4 h-4 ${getAccentText()}`} />
                <span className="font-semibold text-slate-900 dark:text-slate-200">Availability:</span>
                <span className={`font-semibold ${getAccentText()}`}>{profile.details.availability || profile.details.freelance}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              {profile.bioParagraph1} {profile.bioParagraph2}
            </p>
          </div>
        </div>

        {/* Counter Stats Section */}
        <div className="pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <FolderCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  <Counter end={profile.stats.projectsCompleted} />+
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  Projects Completed
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  <Counter end={profile.stats.codingChallenges} />+
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  Coding Challenges
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  <Counter end={profile.stats.technologiesExplored} />+
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  Technologies Explored
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md`}>
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  <Counter end={profile.stats.hoursPracticalLearning} />+
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  Hours Of Practical Learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
