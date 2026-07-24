import React from 'react';
import { ExternalLink, Github, Calendar, User, Tag, X, CheckCircle } from 'lucide-react';
import { ProjectItem, AccentColor } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  accentColor: AccentColor;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, accentColor }) => {
  if (!project) return null;

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500';
      case 'violet': return 'bg-purple-600 hover:bg-purple-500';
      case 'rose': return 'bg-rose-600 hover:bg-rose-500';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500';
      default: return 'bg-sky-600 hover:bg-sky-500';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Modal Header Banner Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 backdrop-blur-sm transition-transform active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${getAccentBg()} mb-2`}>
              {project.categoryLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-sans drop-shadow-md">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs">
            {project.client && (
              <div className="flex items-center gap-2">
                <User className={`w-4 h-4 ${getAccentText()}`} />
                <div>
                  <p className="text-slate-400">Client</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{project.client}</p>
                </div>
              </div>
            )}
            {project.date && (
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${getAccentText()}`} />
                <div>
                  <p className="text-slate-400">Year</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{project.date}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag className={`w-4 h-4 ${getAccentText()}`} />
              <div>
                <p className="text-slate-400">Category</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{project.categoryLabel}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Project Description & Architecture
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Technologies & Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-slate-800">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 text-white shadow-md active:scale-95 transition-all ${getAccentBg()}`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-md active:scale-95 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
