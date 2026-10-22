import React, { useState } from 'react';
import { ExtensionItem, Language } from '../types';
import { soundscape } from '../services/soundscape';
import { Code2, Layers, Copy, Check, ExternalLink, Puzzle } from 'lucide-react';

interface ExtensionsSectionProps {
  extensions: ExtensionItem[];
  lang: Language;
}

export const ExtensionsSection: React.FC<ExtensionsSectionProps> = ({ extensions, lang }) => {
  const isArabic = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    soundscape.playClickTone();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      default:
        return <Puzzle className="w-5 h-5" />;
    }
  };

  return (
    <section id="extensions" className="py-20 lg:py-28 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {isArabic ? 'الإضافات والتكاملات' : 'Ecosystem & Extensions'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {isArabic ? 'الإضافات البرمجية والحلول المتكاملة' : 'Extensions & Architectural Plugins'}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {isArabic
              ? 'إضافات بيئات التطوير، سمات محرر VS Code، وتكاملات تسريع الحركة السينمائية.'
              : 'IDE themes, motion controllers, and database vector connectors expanding the Shaheen ecosystem.'}
          </p>
        </div>

        {/* Extensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {extensions.filter(e => e.published).map((ext) => (
            <div
              key={ext.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#12151c] border border-white/[0.08] hover:border-[#e0a21b]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#181b24] text-[#e0a21b] border border-white/5 group-hover:border-[#e0a21b]/30 transition-colors">
                      {renderIcon(ext.icon)}
                    </div>
                    <span className="text-xs font-mono-code text-slate-400">
                      {ext.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono-code uppercase">
                    {ext.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e0a21b] transition-colors">
                  {ext.name}
                </h3>

                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {ext.description[lang]}
                </p>

                {/* Compatibility */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono-code">
                  <span className="text-slate-500">Supports:</span>
                  {ext.compatibility.map((c, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Install Snippet */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-code uppercase text-slate-500 block">Installation</span>
                  <div className="p-3 rounded-xl bg-[#08090c] border border-white/10 font-mono-code text-xs text-slate-200 flex items-center justify-between gap-3 overflow-hidden">
                    <span className="truncate">{ext.installationInstructions[lang]}</span>
                    <button
                      onClick={() => handleCopy(ext.id, ext.installationInstructions[lang])}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all shrink-0 focus:outline-none"
                      title="Copy install command"
                      aria-label="Copy install command"
                    >
                      {copiedId === ext.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code">
                {ext.docsUrl ? (
                  <a
                    href={ext.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e0a21b] hover:underline flex items-center gap-1"
                  >
                    <span>Marketplace / Docs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-slate-500 font-mono-code">v{ext.version}</span>
                )}

                {ext.repoUrl && (
                  <a
                    href={ext.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
