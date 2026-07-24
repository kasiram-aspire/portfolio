import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Resume } from './components/Resume';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { ScrollToTop } from './components/ScrollToTop';

import {
  alexProfile,
  kasiProfile,
  defaultSkills,
  educationTimeline,
  experienceTimeline,
  defaultProjects,
  defaultTestimonials,
} from './data/portfolioData';

import { AccentColor, ProfileData } from './types';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Profile selection state
  const [activeProfileKey, setActiveProfileKey] = useState<'alex' | 'kasi'>('kasi');
  const [currentProfile, setCurrentProfile] = useState<ProfileData>(kasiProfile);

  // Accent color state
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('portfolio_accent') as AccentColor;
    return saved || 'emerald';
  });

  // Active section for navigation scroll spy
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Customize Drawer state
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Preset subject line for contact form when triggered from services
  const [presetSubject, setPresetSubject] = useState('');

  // Persist dark mode to DOM and localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist accent color to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_accent', accentColor);
  }, [accentColor]);

  // Handle Profile Switch
  const handleSwitchProfile = (key: 'alex' | 'kasi') => {
    setActiveProfileKey(key);
    if (key === 'alex') {
      setCurrentProfile(alexProfile);
    } else {
      setCurrentProfile(kasiProfile);
    }
  };

  // Handle Typed Titles update
  const handleUpdateTypedTitles = (titles: string[]) => {
    setCurrentProfile((prev) => ({
      ...prev,
      typedTitles: titles,
    }));
  };

  // Scroll Spy for Nav Highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'resume', 'portfolio', 'testimonials', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-sky-500 selection:text-white ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Left Sidebar Navigation */}
      <Sidebar
        profile={currentProfile}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        accentColor={accentColor}
      />

      {/* Main Sections Content */}
      <main className="w-full min-h-screen transition-colors duration-300">
        <Hero
          profile={currentProfile}
          onNavigate={handleNavigate}
          accentColor={accentColor}
        />

        <About
          profile={currentProfile}
          accentColor={accentColor}
          onNavigate={handleNavigate}
        />

        <Skills
          skills={defaultSkills}
          accentColor={accentColor}
        />

        <Resume
          education={educationTimeline}
          experience={experienceTimeline}
          accentColor={accentColor}
          userName={currentProfile.name}
        />

        <Portfolio
          projects={defaultProjects}
          accentColor={accentColor}
        />

        <Testimonials
          testimonials={defaultTestimonials}
          accentColor={accentColor}
        />

        <Contact
          profile={currentProfile}
          accentColor={accentColor}
          presetSubject={presetSubject}
        />

        <Footer
          profile={currentProfile}
        />
      </main>

      {/* Customizer Drawer */}
      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        activeProfileKey={activeProfileKey}
        onSwitchProfile={handleSwitchProfile}
        accentColor={accentColor}
        onChangeAccent={setAccentColor}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        profile={currentProfile}
        onUpdateTypedTitles={handleUpdateTypedTitles}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop accentColor={accentColor} />
    </div>
  );
}
