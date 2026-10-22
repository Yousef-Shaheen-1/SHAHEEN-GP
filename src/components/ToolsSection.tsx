import React, { useState, useEffect, useRef } from 'react';
import { ToolItem, Language } from '../types';
import { soundscape } from '../services/soundscape';
import { Terminal, Radio, Shield, Copy, Check, ExternalLink, Download, BookOpen, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ToolsSectionProps {
  tools: ToolItem[];
  lang: Language;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools, lang }) => {
  const isArabic = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.tool-card');
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
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [tools]);

  const handleCopy = (id: string, text: string) => {
    soundscape.playClickTone();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Radio':
        return <Radio className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="tools" className="py-20 lg:py-28 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {isArabic ? 'أدوات المنظومة' : 'Platform Engineering Tools'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {isArabic ? 'الأدوات وحزم البرمجة السيادية' : 'Sovereign CLI & Developer Tools'}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {isArabic
              ? 'حزم أدوات سطر الأوامر ومحركات البث المباشر المطورة حصرياً لمنصات مجموعة شاهين.'
              : 'Proprietary command-line utilities, telemetry engines, and cryptographic vault tooling engineered by SHAHEEN GROUP.'}
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {tools.filter(t => t.published).map((tool) => (
            <div
              key={tool.id}
              className="tool-card p-6 sm:p-8 rounded-2xl bg-[#12151c] border border-white/[0.08] hover:border-[#e0a21b]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"

            >
              <div className="space-y-5">
                {/* Header: Icon, Category & Version */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#181b24] text-[#e0a21b] border border-white/5 group-hover:border-[#e0a21b]/30 transition-colors">
                      {renderIcon(tool.icon)}
                    </div>
                    <span className="text-xs font-mono-code text-slate-400">
                      {tool.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono-code text-[#e0a21b]">
                    v{tool.version}
                  </span>
                </div>

                {/* Tool Name */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#e0a21b] transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {tool.description[lang]}
                </p>

                {/* Compatibility Tags */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono-code text-slate-400">
                  <span className="text-slate-500">Compatibility:</span>
                  {tool.compatibility.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300">
                      {comp}
                    </span>
                  ))}
                </div>

                {/* Quick Install Code Box */}
                <div className="relative p-3 rounded-xl bg-[#08090c] border border-white/10 font-mono-code text-xs text-slate-200 flex items-center justify-between gap-3 overflow-hidden">
                  <span className="truncate">{tool.installationInstructions[lang]}</span>
                  <button
                    onClick={() => handleCopy(tool.id, tool.installationInstructions[lang])}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all shrink-0 focus:outline-none"
                    title="Copy command"
                    aria-label="Copy installation command"
                  >
                    {copiedId === tool.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code">
                {tool.docsUrl ? (
                  <a
                    href={tool.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e0a21b] hover:underline flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Documentation</span>
                  </a>
                ) : (
                  <span className="text-slate-600">Enterprise Verified</span>
                )}

                {tool.downloadUrl && (
                  <a
                    href={tool.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Archive</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
