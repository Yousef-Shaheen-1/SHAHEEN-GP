import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { MapPin, Terminal, Award, Compass, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
  onExploreProjects: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onExploreProjects,
}) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-20 lg:py-32 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Emblem & Visual Anchor */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Ambient Gold Glow */}
            <div className="absolute w-64 h-64 rounded-full bg-[#e0a21b]/20 blur-3xl pointer-events-none" />

            <div className="relative p-10 rounded-3xl bg-[#12151c] border border-white/[0.08] shadow-2xl flex flex-col items-center text-center space-y-6 w-full max-w-md">
              <div className="relative w-28 h-28 flex items-center justify-center p-2 rounded-2xl bg-[#181b24] border border-[#e0a21b]/30 shadow-[0_0_30px_rgba(224,162,27,0.2)]">
                <img
                  src={import.meta.env.BASE_URL + 'assets/brand/shaheen-icon-transparent.png'}
                  alt="SHAHEEN GROUP Emblem"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  SHAHEEN GROUP
                </h3>
                <span className="text-xs font-mono-code text-[#e0a21b] block">
                  {t.about.badge}
                </span>
              </div>

              {/* Verified Trust Strip (Unboxed Metadata) */}
              <div className="w-full pt-4 border-t border-white/[0.08] flex flex-col gap-3 text-xs text-left rtl:text-right">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.about.locationLabel}</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e0a21b]" />
                    <span>Amman, Jordan</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.about.identityLabel}</span>
                  <span className="text-[#e0a21b] font-semibold">
                    Yousef A. Shaheen
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.about.signatureLabel}</span>
                  <span className="font-mono-code text-slate-200 text-[11px]">
                    Yousef@Shaheen:~#
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Narrative */}
          <div className="lg:col-span-7 space-y-8 text-left rtl:text-right">
            <div className="space-y-3">
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
                {t.about.kicker}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
                {t.about.title}
              </h2>
              <p className="text-lg sm:text-xl text-[#e0a21b] font-medium leading-snug">
                "{t.about.statement}"
              </p>
            </div>

            <div className="space-y-5 text-slate-300 text-base leading-relaxed font-light">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* 3 Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#12151c] border border-white/[0.06] space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">Sovereignty</h4>
                <p className="text-xs text-slate-400">Zero foreign dependencies or fragile third-party black boxes.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/[0.06] space-y-1.5">
                <Compass className="w-4 h-4 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">Precision</h4>
                <p className="text-xs text-slate-400">Millisecond latency tolerances and mathematical type scales.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/[0.06] space-y-1.5">
                <Award className="w-4 h-4 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">Distinction</h4>
                <p className="text-xs text-slate-400">Cinematic art direction that commands authority globally.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  soundscape.playClickTone();
                  onExploreProjects();
                }}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f3b52d] transition-all rounded-md shadow-md"
              >
                Explore Active Architecture →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
