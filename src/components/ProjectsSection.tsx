import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Project, Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { Search, ArrowUpRight, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: Project[];
  lang: Language;
  onSelectProject: (p: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (!p.published) return false;
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title[lang].toLowerCase().includes(q) ||
        p.summary[lang].toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.client.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery, lang]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProjects]);


  const categories = [
    { id: 'all', label: t.projects.all },
    { id: 'ai', label: t.projects.filterAi },
    { id: 'fintech', label: t.projects.filterFintech },
    { id: 'aerospace', label: t.projects.filterAerospace },
  ];

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
              {t.projects.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              {t.projects.title}
            </h2>
            <p className="text-base text-slate-400 max-w-2xl font-light">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.projects.searchPlaceholder}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 rounded-lg bg-[#181b24] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e0a21b] transition-all"
            />
          </div>
        </div>

        {/* Category Filters (Segmented Functional Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundscape.playClickTone();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all focus:outline-none ${
                selectedCategory === cat.id
                  ? 'bg-[#e0a21b] text-black font-bold shadow-[0_0_15px_rgba(224,162,27,0.3)]'
                  : 'bg-[#181b24] text-slate-300 hover:text-white hover:bg-[#202532] border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Gallery */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#12151c] border border-white/5 text-slate-400 text-sm">
            {t.projects.noResults}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    soundscape.playClickTone();
                    onSelectProject(project);
                  }}
                  className={`project-card group relative rounded-2xl bg-[#12151c] border border-white/[0.08] hover:border-[#e0a21b]/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
                    isFirst ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Project Image Container */}
                  <div className={`relative w-full overflow-hidden bg-[#0c0e12] ${
                    isFirst ? 'h-72 sm:h-96' : 'h-60 sm:h-72'
                  }`}>
                    <img
                      src={project.image}
                      alt={project.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 contrast-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-[#12151c]/40 to-transparent" />
                    
                    {/* Top Right Action Cue */}
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-black/60 group-hover:bg-[#e0a21b] text-white group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Card Content & Unboxed Metadata */}
                  <div className="p-6 space-y-4">
                    {/* Unboxed Metadata with · separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code">
                      <span className="text-[#e0a21b] font-semibold">{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e0a21b] transition-colors leading-snug">
                      {project.title[lang]}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-light">
                      {project.summary[lang]}
                    </p>

                    {/* Key Metric Preview & Tech List */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs">
                      {project.metrics[0] && (
                        <div className="flex items-center gap-1.5 font-mono-code">
                          <span className="text-[#e0a21b] font-bold tabular-nums">
                            {project.metrics[0].value}
                          </span>
                          <span className="text-slate-500">
                            {project.metrics[0].label[lang]}
                          </span>
                        </div>
                      )}

                      <span className="text-[#e0a21b] font-semibold tracking-wider uppercase text-[11px] group-hover:underline">
                        {t.projects.viewProject} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
