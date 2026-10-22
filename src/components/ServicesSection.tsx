import React, { useEffect, useRef } from 'react';
import { Service, Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { Cpu, Sparkles, Layers, Shield, Terminal, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  services: Service[];
  lang: Language;
  onContactClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  lang,
  onContactClick,
}) => {
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.service-card');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [services]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#e0a21b]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#e0a21b]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#e0a21b]" />;
      case 'Shield':
      default:
        return <Shield className="w-6 h-6 text-[#e0a21b]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {t.services.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 4-Column Grid of Disciplines */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card p-8 rounded-2xl bg-[#12151c] border border-white/[0.08] hover:border-[#e0a21b]/40 transition-all duration-300 group flex flex-col justify-between"
            >

              <div className="space-y-6">
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="text-2xl font-mono-code font-bold text-[#e0a21b]">
                    {service.number}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#181b24] border border-white/5 group-hover:border-[#e0a21b]/30 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e0a21b] transition-colors">
                  {service.title[lang]}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {service.description[lang]}
                </p>

                {/* Feature Bullet Strip (Unboxed Clean List) */}
                <div className="space-y-2 pt-2">
                  {service.features[lang].map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e0a21b]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono-code text-slate-500">SHAHEEN DEPLOYMENT SPEC</span>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onContactClick();
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#e0a21b] hover:text-[#f3b52d] flex items-center gap-1.5 focus:outline-none"
                >
                  <span>{t.services.exploreService}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
