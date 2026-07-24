import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Download, ArrowRight, Mail, Sparkles, ChevronDown, Code, CheckCircle2, Code2, Terminal, Briefcase, FileText, FileDown, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData, AccentColor } from '../types';
import { generateKasiramResumePdf } from '../utils/generatePdf';

interface HeroProps {
  profile: ProfileData;
  onNavigate: (sectionId: string) => void;
  accentColor: AccentColor;
}

// Counter Hook/Component for animated incrementing numbers
const Counter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = Math.max(1, Math.ceil(end / totalSteps));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, accentColor }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'downloading' | 'completed'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownloadCv = () => {
    if (downloadState !== 'idle') return;

    setDownloadState('generating');
    setDownloadProgress(20);

    // Step 1: Generating PDF document structure
    setTimeout(() => {
      setDownloadState('downloading');
      setDownloadProgress(55);
    }, 400);

    // Step 2: Download progress simulation
    setTimeout(() => {
      setDownloadProgress(88);
    }, 800);

    // Step 3: Complete download
    setTimeout(() => {
      setDownloadProgress(100);
      setDownloadState('completed');

      // Launch celebratory confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#818cf8', '#34d399', '#f43f5e'],
      });

      // Generate and download Kasiram P's formatted PDF resume
      generateKasiramResumePdf();
    }, 1200);

    // Reset back to idle state after 4.5 seconds
    setTimeout(() => {
      setDownloadState('idle');
      setDownloadProgress(0);
    }, 5200);
  };

  const getAccentBgClass = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20';
      case 'violet': return 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20';
      case 'rose': return 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20';
      default: return 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20';
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start lg:ml-[300px] bg-slate-950 text-white overflow-hidden"
    >
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={isMobile ? { opacity: 0, scale: 0.88, y: 40 } : { opacity: 1, scale: 1, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: isMobile ? 1.2 : 0.8,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <img
          src="/assets/swd_casual_kasi-1.png"
          alt={profile.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            const fallbackUrl =
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85";
            if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
          className="
            absolute
            inset-0

            w-full
            h-full
            object-cover
            object-center

            sm:object-[30%_20%]
            md:object-[40%_22%]

            lg:w-auto
            lg:h-full
            lg:max-w-none
            lg:object-contain
            lg:left-5
            xl:left-32
            2xl:left-40

            transition-all
            duration-700
          "
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent lg:from-slate-950/75 lg:via-slate-950/20" />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-10 lg:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isMobile ? 1.8 : 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-lg text-xs sm:text-sm text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">{profile.details.freelance}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{profile.details.city}</span>
          </div>

          {/* Name Display */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-sans drop-shadow-xl">
            {profile.name}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed drop-shadow">
            {profile.bioLead}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className={`px-7 py-3.5 rounded-xl font-semibold text-base flex items-center gap-2.5 shadow-xl transition-all duration-200 active:scale-95 ${getAccentBgClass()}`}
            >
              <Mail className="w-5 h-5" />
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleDownloadCv}
              disabled={downloadState !== 'idle' && downloadState !== 'completed'}
              className={`relative overflow-hidden group min-w-[180px] px-6 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 bg-slate-900/90 text-white border backdrop-blur-md shadow-lg transition-all duration-300 active:scale-95 ${
                downloadState === 'completed'
                  ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                  : downloadState === 'downloading' || downloadState === 'generating'
                  ? 'border-sky-500/80 bg-slate-900 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                  : 'border-slate-700/80 hover:border-sky-500/70 hover:bg-slate-800/90 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]'
              }`}
            >
              {/* Progress bar line along the bottom of the button */}
              {(downloadState === 'generating' || downloadState === 'downloading' || downloadState === 'completed') && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-1.5 ${
                    downloadState === 'completed'
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                      : 'bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${downloadProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                />
              )}

              {/* Shimmer effect on hover in idle state */}
              {downloadState === 'idle' && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              )}

              {downloadState === 'idle' && (
                <>
                  <div className="relative flex items-center justify-center">
                    <FileDown className="w-5 h-5 text-sky-400 group-hover:translate-y-0.5 group-hover:text-cyan-300 transition-all duration-200" />
                  </div>
                  <span className="relative z-10">Download CV</span>
                  <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 group-hover:bg-sky-500/30 transition-colors">
                    PDF
                  </span>
                </>
              )}

              {downloadState === 'generating' && (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                  <span className="relative z-10 text-sky-300 font-medium">Preparing PDF...</span>
                </div>
              )}

              {downloadState === 'downloading' && (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                  >
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span className="relative z-10 text-cyan-200 font-mono text-sm font-medium">
                    Downloading {downloadProgress}%
                  </span>
                </div>
              )}

              {downloadState === 'completed' && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">PDF Downloaded!</span>
                </motion.div>
              )}
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="relative group overflow-hidden px-6 py-3.5 rounded-xl font-medium text-base flex items-center gap-2.5 bg-slate-900/90 text-slate-200 border-2 border-sky-500/70 hover:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all duration-300 active:scale-95"
            >
              {/* Animated software tech scanning laser beam border effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Tech glowing border pulse outline */}
              <span className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 opacity-40 group-hover:opacity-100 blur-[2px] transition-opacity duration-300 -z-10 animate-pulse pointer-events-none" />

              {/* Animated Tech Icon */}
              <div className="relative flex items-center justify-center">
                <Code2 className="w-5 h-5 text-sky-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
              </div>

              <span className="relative z-10 font-semibold text-slate-100 group-hover:text-white transition-colors flex items-center gap-2">
                <span>Explore Projects</span>
                <Terminal className="w-4 h-4 text-sky-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </span>
            </button>
          </div>

          {/* Quick Highlight Stats Pill */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 max-w-2xl">
            <div className="bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg border border-slate-800/60">
              <div className="text-2xl font-bold text-white"><Counter end={profile.stats.projectsCompleted} />+</div>
              <div className="text-xs text-slate-400">Projects Completed</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg border border-slate-800/60">
              <div className="text-2xl font-bold text-white"><Counter end={profile.stats.codingChallenges} />+</div>
              <div className="text-xs text-slate-400">Coding Challenges</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg border border-slate-800/60">
              <div className="text-2xl font-bold text-white"><Counter end={profile.stats.technologiesExplored} />+</div>
              <div className="text-xs text-slate-400">Technologies Explored</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg border border-slate-800/60">
              <div className="text-2xl font-bold text-white"><Counter end={profile.stats.hoursPracticalLearning} />+</div>
              <div className="text-xs text-slate-400">Hours of Practical Learning</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => onNavigate('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 lg:left-[calc(50%+150px)] -translate-x-1/2 z-10 p-3 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all animate-bounce"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};
