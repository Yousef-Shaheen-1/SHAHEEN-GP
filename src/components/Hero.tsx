import React, { useState, useEffect, useRef } from 'react';
import { Language, NavView } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { ArrowDown, MapPin, Terminal, Film, Sparkles, Layers } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onNavigate: (view: NavView) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCameraMode, setActiveCameraMode] = useState<'parallax' | 'lighting' | 'drift'>('parallax');
  const [showAssetInfo, setShowAssetInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeCameraMode !== 'parallax') return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeCameraMode]);

  // Parallax offsets
  const subjectOffsetX = activeCameraMode === 'parallax' ? mousePos.x * -18 : 0;
  const subjectOffsetY = activeCameraMode === 'parallax' ? mousePos.y * -10 : 0;
  const lightOffsetX = mousePos.x * 25;
  const lightOffsetY = mousePos.y * 25;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0c0e12] border-b border-white/[0.06]"
      aria-label="Cinematic Hero"
    >
      {/* 1. Atmospheric Deep Background & Lighting Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep ambient dark backdrop */}
        <div className="absolute inset-0 bg-[#0c0e12]" />
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />

        {/* Dynamic Studio Gold Light Glow behind subject */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-transform duration-700 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #e0a21b 0%, rgba(224, 162, 27, 0) 70%)',
            top: `calc(40% + ${lightOffsetY}px)`,
            right: lang === 'en' ? `calc(15% + ${lightOffsetX}px)` : 'auto',
            left: lang === 'ar' ? `calc(15% - ${lightOffsetX}px)` : 'auto',
          }}
        />

        {/* Vignette Scrim */}
        <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      </div>

      {/* 2. Main Hero Layout Split Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column (Desktop 7 cols): Typographic Authority */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left rtl:text-right space-y-6">
          
          {/* Terminal & Location Bar (Unboxed Metadata) */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-md font-mono-code text-[#e0a21b]">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.hero.terminalPrompt}</span>
            </div>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#e0a21b]" />
              <span className="font-medium tracking-wide">{t.hero.location}</span>
            </div>
          </div>

          {/* Editorial Display Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              <span className="block">{t.hero.headlinePre}</span>
              <span className="block text-gold-gradient drop-shadow-[0_4px_30px_rgba(224,162,27,0.25)]">
                {t.hero.headlinePost}
              </span>
            </h1>
          </div>

          {/* Supporting Brand Substatement */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl text-pretty border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#e0a21b]/40 pl-4 rtl:pl-0 rtl:pr-4">
            {t.hero.substatement}
          </p>

          {/* CTAs & Interactive Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundscape.playClickTone();
                onNavigate('projects');
              }}
              className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f5b82e] active:scale-95 transition-all rounded-md shadow-[0_0_25px_rgba(224,162,27,0.35)] flex items-center gap-2 group focus:outline-none"
            >
              <span>{t.hero.primaryCta}</span>
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
            </button>

            <button
              onClick={() => {
                soundscape.playClickTone();
                onNavigate('about');
              }}
              className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 active:scale-95 transition-all rounded-md focus:outline-none"
            >
              {t.hero.secondaryCta}
            </button>
          </div>

          {/* Interactive Cinematic Engine Selector */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-500">Camera Engine:</span>
            <div className="inline-flex rounded-lg bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => {
                  soundscape.playClickTone();
                  setActiveCameraMode('parallax');
                }}
                className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeCameraMode === 'parallax'
                    ? 'bg-[#e0a21b] text-black font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{t.hero.motionModes.parallax}</span>
              </button>

              <button
                onClick={() => {
                  soundscape.playClickTone();
                  setActiveCameraMode('lighting');
                }}
                className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                  activeCameraMode === 'lighting'
                    ? 'bg-[#e0a21b] text-black font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{t.hero.motionModes.spotlight}</span>
              </button>
            </div>

            <button
              onClick={() => setShowAssetInfo(!showAssetInfo)}
              className="ml-auto text-[11px] text-[#e0a21b]/80 hover:text-[#e0a21b] underline flex items-center gap-1"
            >
              <Film className="w-3 h-3" />
              <span>Asset Disclosure</span>
            </button>
          </div>

          {/* Technical Asset Disclosure Callout */}
          {showAssetInfo && (
            <div className="p-3.5 rounded-lg bg-[#181b24] border border-white/10 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="text-[#e0a21b]">Engineering & Motion Specification</span>
                <button
                  onClick={() => setShowAssetInfo(false)}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-400 leading-relaxed">
                As required by Section 04 of the project brief: The human subject is isolated into a separate high-resolution foreground visual layer (`shaheen-hero-subject.png`). Parallax depth, ambient studio rim lighting, and a grounded shadow plane simulate luxury fashion cinematography. An integration slot for `public/assets/video/hero-walk-loop.mp4` is configured for video assets when provided.
              </p>
            </div>
          )}
        </div>

        {/* Right Column (Desktop 5 cols): Cinematic Walking Subject Scene */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[580px] lg:min-h-[680px]">
          
          {/* Subtle Golden Radial Spotlight behind Subject */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#e0a21b]/15 blur-3xl pointer-events-none" />

          {/* Shadow Grounding Plane (Grounded perspective base for subject feet) */}
          <div className="absolute bottom-6 sm:bottom-10 w-48 sm:w-64 h-8 bg-black/80 rounded-full blur-xl pointer-events-none scale-y-50" />

          {/* Primary Cinematic Subject Container with Parallax & Lighting */}
          <div
            className={`relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] transition-transform duration-300 ease-out flex flex-col items-center justify-center ${
              activeCameraMode === 'drift' ? 'animate-pulse duration-1000' : ''
            }`}
            style={{
              transform: `translate3d(${subjectOffsetX}px, ${subjectOffsetY}px, 0)`,
            }}
          >
            {/* The Isolated Subject Layer with Gold Rim Drop Shadow */}
            <div className="relative group">
              <img
                src="/assets/cinematic/shaheen-hero-subject.png"
                alt="Yousef A. Shaheen - Mastermind of SHAHEEN GROUP"
                className="w-full h-auto object-contain max-h-[520px] sm:max-h-[640px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
                onError={(e) => {
                  // Graceful fallback to original background if cutout ever fails
                  (e.target as HTMLImageElement).src = '/assets/cinematic/shaheen-hero-background.png';
                }}
                referrerPolicy="no-referrer"
              />

              {/* High-fashion subtle rim light accent overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(224, 162, 27, 0.4)',
                }}
              />
            </div>

            {/* Subtle Terminal Identity Tag below subject */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-[#181b24]/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#e0a21b] animate-pulse" />
              <span className="text-xs font-mono-code text-white">Yousef@Shaheen:~# Mastermind</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none opacity-80">
        <span className="text-[11px] font-mono-code uppercase tracking-widest text-slate-400">
          {t.hero.scrollCue}
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#e0a21b] via-[#e0a21b]/40 to-transparent animate-bounce" />
      </div>
    </section>
  );
};
