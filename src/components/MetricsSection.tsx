import React from 'react';
import { MetricItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface MetricsSectionProps {
  metrics: MetricItem[];
  lang: Language;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics, lang }) => {
  const t = translations[lang];

  return (
    <section className="py-16 bg-[#12151c]/60 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {t.metrics.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.metrics.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-[#181b24] border border-white/[0.06] hover:border-[#e0a21b]/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono-code tabular-nums tracking-tight">
                  <span className="text-gold-gradient">{m.value}</span>
                  {m.suffix && <span className="text-slate-400 text-2xl sm:text-3xl">{m.suffix}</span>}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-2">
                  {m.label[lang]}
                </div>
              </div>

              <div className="text-xs text-slate-400 font-light border-t border-white/[0.06] pt-3">
                {m.context[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
