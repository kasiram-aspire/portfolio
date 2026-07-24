import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { AccentColor } from '../types';

interface ScrollToTopProps {
  accentColor: AccentColor;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ accentColor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500';
      case 'violet': return 'bg-purple-600 hover:bg-purple-500';
      case 'rose': return 'bg-rose-600 hover:bg-rose-500';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500';
      default: return 'bg-sky-600 hover:bg-sky-500';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`relative p-3.5 rounded-full ${getAccentBg()} text-white shadow-2xl transition-all duration-200 active:scale-95 group`}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
