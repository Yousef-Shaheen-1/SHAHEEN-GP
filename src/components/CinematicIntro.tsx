import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { soundscape } from '../services/soundscape';
import { Sparkles, Terminal, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface CinematicIntroProps {
  onComplete: () => void;
  lang: Language;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [particlesActive, setParticlesActive] = useState(true);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{ x: number; y: number; size: number; speedY: number; opacity: number }> = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: (Math.random() * 0.4 + 0.1) * -1,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) p.y = height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 162, 27, ${p.opacity})`;
        ctx.shadowColor = '#e0a21b';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP Cinematic Reveal Timeline
  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Escape key skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    // 1. Initial Void with subtle ambient light flare
    tl.set(containerRef.current, { opacity: 1 })
      .set([logoRef.current, titleRef.current, subtitleRef.current, terminalRef.current, actionsRef.current], {
        opacity: 0,
        y: 30,
      })
      .set(lightSweepRef.current, { x: '-150%', opacity: 0 });

    // 2. Light flare and crest elevation
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'expo.out',
    })
      // Gold beam light sweep across logo
      .to(lightSweepRef.current, {
        x: '150%',
        opacity: 0.9,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.6')
      // 3. Typography reveal with letter spacing expansion
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.25em',
        duration: 1.2,
      }, '-=0.5')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
      }, '-=0.7')
      .to(terminalRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5')
      .to(actionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.3');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      tl.kill();
    };
  }, [onComplete]);

  const finishIntro = () => {
    soundscape.playClickTone();
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        onComplete();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090d] text-white overflow-hidden select-none"
    >
      {/* Background Star Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Atmospheric Cinematic Radial Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#e0a21b]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#e0a21b]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Central Identity Presentation */}
      <div className="relative z-10 max-w-2xl px-6 text-center flex flex-col items-center">
        {/* Crest with Gold Shimmer */}
        <div ref={logoRef} className="relative w-28 h-28 mb-8 p-3 rounded-2xl bg-gradient-to-b from-[#e0a21b]/20 via-[#13161c] to-[#0a0d12] border border-[#e0a21b]/40 shadow-[0_0_50px_rgba(224,162,27,0.25)] overflow-hidden">
          <img
            src="/assets/brand/shaheen-icon-transparent.png"
            alt="SHAHEEN GROUP Crest"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(224,162,27,0.4)]"
          />
          {/* Sweeping gold light streak */}
          <div
            ref={lightSweepRef}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#e0a21b]/80 to-transparent skew-x-[-25deg] pointer-events-none z-20"
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white drop-shadow-md mb-3"
          style={{ fontFamily: 'Cinzel, Georgia, serif' }}
        >
          SHAHEEN GROUP
        </h1>

        {/* Slogan */}
        <p
          ref={subtitleRef}
          className="text-sm md:text-base font-light text-[#e0a21b] tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(224,162,27,0.4)]"
        >
          {lang === 'ar' ? 'ما بعد الابتكار. ما وراء الحدود.' : 'Beyond Innovation. Beyond Limits.'}
        </p>

        {/* Terminal Signature */}
        <div
          ref={terminalRef}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 mb-10"
        >
          <Terminal className="w-3.5 h-3.5 text-[#e0a21b]" />
          <span className="text-[#e0a21b]">Yousef@Shaheen:~#</span>
          <span className="text-neutral-500">|</span>
          <span>From: Jordan - Amman</span>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={finishIntro}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,162,27,0.6)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45" />
            <span>{lang === 'ar' ? 'بدء التجربة السينمائية' : 'Enter Experience'}</span>
          </button>

          <button
            onClick={finishIntro}
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer font-mono"
          >
            {lang === 'ar' ? 'تخطي المقدمة [ESC]' : 'Skip Intro [ESC]'}
          </button>
        </div>
      </div>

      {/* Bottom Legal & Ambient Indicator */}
      <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between items-center text-[11px] font-mono text-neutral-500 pointer-events-none">
        <span>SHAHEEN DIGITAL COMMAND // v2.6.4</span>
        <span className="hidden sm:inline">HARDWARE-ACCELERATED GSAP ENGINE</span>
      </div>
    </div>
  );
};
