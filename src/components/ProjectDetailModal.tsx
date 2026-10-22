import React, { useEffect } from 'react';
import { Project, Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { X, ExternalLink, Cpu, BarChart3, ShieldCheck, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
  onSelectRelated?: (p: Project) => void;
  allProjects?: Project[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  lang,
  onSelectRelated,
  allProjects = [],
}) => {
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const related = allProjects
    .filter((p) => p.id !== project.id && p.published)
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-4xl bg-[#12151c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundscape.playClickTone();
            onClose();
          }}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 transition-all focus:outline-none"
          aria-label={t.projects.closeModal}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0c0e12]">
          <img
            src={project.image}
            alt={project.title[lang]}
            className="w-full h-full object-cover filter brightness-90 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-[#12151c]/40 to-transparent" />
          
          {/* Header Metadata on Image */}
          <div className="absolute bottom-6 left-6 right-6 rtl:left-6 rtl:right-6">
            <div className="flex items-center gap-2 text-xs text-[#e0a21b] font-mono-code mb-2">
              <span>{project.client}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span className="uppercase">{project.category}</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold text-white text-balance"
            >
              {project.title[lang]}
            </h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Summary */}
          <div className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
            {project.summary[lang]}
          </div>

          {/* Key Impact Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#181b24] border border-white/[0.08]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#e0a21b] font-mono-code tabular-nums">
                  {m.value}
                </span>
                <span className="text-xs text-slate-400 mt-1">{m.label[lang]}</span>
              </div>
            ))}
          </div>

          {/* Two-Column Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-[#e0a21b] font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <h3>{t.projects.challenge}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {project.challenge[lang]}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-[#e0a21b] font-semibold text-sm">
                <Cpu className="w-4 h-4" />
                <h3>{t.projects.solution}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {project.solution[lang]}
              </p>
            </div>
          </div>

          {/* Technologies Deployed (Unboxed tags) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
              {t.projects.techStack}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-[#181b24] text-slate-200 border border-white/10 font-mono-code"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External Demonstration Link */}
          {project.projectUrl && (
            <div className="pt-2 flex justify-start">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f3b52d] transition-all shadow-[0_0_15px_rgba(224,162,27,0.3)]"
              >
                <span>{t.projects.demoLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Related Case Studies */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                Related Flagship Deployments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      soundscape.playClickTone();
                      if (onSelectRelated) onSelectRelated(rel);
                    }}
                    className="p-4 rounded-xl bg-[#181b24] hover:bg-[#1f2430] border border-white/[0.06] hover:border-[#e0a21b]/40 text-left rtl:text-right transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-[#e0a21b] font-mono-code block">
                        {rel.client} · {rel.year}
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#e0a21b] transition-colors">
                        {rel.title[lang]}
                      </span>
                    </div>
                    <span className="text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
