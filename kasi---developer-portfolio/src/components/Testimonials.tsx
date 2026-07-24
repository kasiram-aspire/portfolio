import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem, AccentColor } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  accentColor: AccentColor;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, accentColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Testimonials
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
            Feedback from founders, product managers, and engineering directors I have partnered with on complex projects.
          </p>
        </div>

        {/* Carousel / Card Featured */}
        <div className="relative max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <Quote className={`absolute top-6 right-8 w-16 h-16 opacity-10 ${getAccentText()}`} />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <img
              src={current.avatarUrl}
              alt={current.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md shrink-0"
            />

            <div className="space-y-4 text-center sm:text-left">
              {/* Star Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "{current.quote}"
              </p>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {current.name}
                </h4>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {current.role} • <span className={getAccentText()}>{current.company}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? `w-8 ${getAccentBg()}` : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
