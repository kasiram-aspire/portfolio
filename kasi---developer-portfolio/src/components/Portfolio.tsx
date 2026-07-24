import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Eye, Github, Layers, Search } from 'lucide-react';
import { ProjectItem, ProjectCategory, AccentColor } from '../types';
import { ProjectModal } from './ProjectModal';

interface PortfolioProps {
  projects: ProjectItem[];
  accentColor: AccentColor;
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects, accentColor }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'app', label: 'App' },
    { id: 'card', label: 'Card' },
    { id: 'web', label: 'Web' },
    { id: 'ai', label: 'AI/Fullstack' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    <section id="portfolio" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Portfolio
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
            A showcase of recent digital products, interactive web applications, SaaS dashboards, and creative design systems I have designed and engineered.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                activeCategory === cat.id
                  ? getAccentActiveTab()
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Container with Hover Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-95"
                    />

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        aria-label="View project details"
                        className="p-3.5 rounded-full bg-white text-slate-900 hover:bg-sky-400 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo Link"
                          className="p-3.5 rounded-full bg-white text-slate-900 hover:bg-sky-400 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="p-3.5 rounded-full bg-white text-slate-900 hover:bg-sky-400 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                          title="GitHub Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md border border-slate-700/80">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 space-y-3">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl font-bold text-slate-900 dark:text-white hover:text-sky-500 cursor-pointer transition-colors"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={accentColor}
      />
    </section>
  );
};
