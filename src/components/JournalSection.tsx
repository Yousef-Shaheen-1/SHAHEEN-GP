import React, { useState } from 'react';
import { JournalArticle, Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { BookOpen, X, Share2, Clock, Calendar, ArrowRight, Check } from 'lucide-react';

interface JournalSectionProps {
  articles: JournalArticle[];
  lang: Language;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ articles, lang }) => {
  const t = translations[lang];
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleShare = (slug: string) => {
    soundscape.playClickTone();
    const url = `${window.location.origin}#journal/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <section id="journal" className="py-20 lg:py-32 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {t.journal.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {t.journal.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {t.journal.subtitle}
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#12151c] border border-white/[0.08] hover:border-[#e0a21b]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Article Image Banner */}
                <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-[#0c0e12]">
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-transparent to-transparent" />
                </div>

                {/* Unboxed Metadata Strip */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code pt-1">
                  <span className="text-[#e0a21b] font-semibold">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} {t.journal.readingTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e0a21b] transition-colors leading-snug">
                  {article.title[lang]}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                  {article.excerpt[lang]}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    setActiveArticle(article);
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#e0a21b] hover:text-[#f3b52d] flex items-center gap-1.5 focus:outline-none"
                >
                  <span>{t.journal.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => handleShare(article.slug)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] transition-all flex items-center gap-1 text-xs"
                  title="Share article URL"
                >
                  {copiedSlug === article.slug ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[11px] font-mono-code hidden sm:inline">
                    {copiedSlug === article.slug ? 'Copied' : 'Share'}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-[#12151c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 p-6 sm:p-10 space-y-6">
            
            <button
              onClick={() => {
                soundscape.playClickTone();
                setActiveArticle(null);
              }}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2.5 rounded-full bg-black/50 text-white/80 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-[#e0a21b] font-mono-code">
              <span>{activeArticle.category}</span>
              <span>·</span>
              <span>{activeArticle.date}</span>
              <span>·</span>
              <span>{activeArticle.readTime} {t.journal.readingTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight text-balance">
              {activeArticle.title[lang]}
            </h2>

            {/* Banner Image */}
            <div className="h-64 w-full rounded-xl overflow-hidden bg-black">
              <img
                src={activeArticle.image}
                alt={activeArticle.title[lang]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Prose Content */}
            <div className="prose prose-invert max-w-none text-slate-300 font-light text-base leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content[lang]}
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono-code">
              <span>SHAHEEN DISPATCH ARCHIVE</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-[#e0a21b] hover:underline"
              >
                {t.journal.backToJournal}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
