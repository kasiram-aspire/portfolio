import React from 'react';
import { Code2, Layout, Bot, Server, Smartphone, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem, AccentColor } from '../types';

interface ServicesProps {
  services: ServiceItem[];
  accentColor: AccentColor;
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, accentColor, onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Layout': return Layout;
      case 'Bot': return Bot;
      case 'Server': return Server;
      case 'Smartphone': return Smartphone;
      case 'Zap': return Zap;
      default: return Code2;
    }
  };

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
    <section id="services" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Services
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
            High-value engineering solutions tailored to scale your software products, optimize digital performance, and deliver exceptional user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl ${getAccentBg()} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${getAccentText()} shrink-0`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700/60 mt-6">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${getAccentText()} hover:underline group-hover:gap-3 transition-all`}
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
