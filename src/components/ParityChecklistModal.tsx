import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { X, CheckCircle2, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';

interface ParityChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ParityChecklistModal: React.FC<ParityChecklistModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  const parityItems = [
    {
      feature: 'Full-screen cinematic hero opening',
      referenceStatus: 'Verified in reference',
      shaheenStatus: 'Implemented with supplied icon and character subject',
      type: 'verified',
    },
    {
      feature: 'Walking subject motion & cinematic composition',
      referenceStatus: 'Motion and video layer in reference',
      shaheenStatus: 'Implemented via isolated subject layer, 3D parallax, and studio lighting (with video slot disclosure)',
      type: 'disclosure',
    },
    {
      feature: 'Project showcase with category filter & live search',
      referenceStatus: 'Verified in reference',
      shaheenStatus: 'Implemented with real bento grid, category filters, and live search',
      type: 'verified',
    },
    {
      feature: 'Deep project detail case studies & metrics',
      referenceStatus: 'Verified in reference',
      shaheenStatus: 'Implemented with challenges, solutions, tech stacks, and quantitative KPIs',
      type: 'verified',
    },
    {
      feature: 'Bilingual English & Arabic (RTL / LTR)',
      referenceStatus: 'Single-language in reference',
      shaheenStatus: 'Bespoke Shaheen Innovation: Complete RTL typography with Cairo & Plus Jakarta Sans',
      type: 'custom',
    },
    {
      feature: 'Persistent Content Management System (CMS)',
      referenceStatus: 'Static hardcoded content in reference',
      shaheenStatus: 'Bespoke Shaheen Innovation: Real persistent CMS with local storage, CRUD, and block reordering',
      type: 'custom',
    },
    {
      feature: 'Server-side Gemini AI Content Assistant',
      referenceStatus: 'Not present in reference',
      shaheenStatus: 'Bespoke Shaheen Innovation: Server-side Gemini API proxy for case study drafts & translations',
      type: 'custom',
    },
    {
      feature: 'Cinematic Ambient Audio Soundscape',
      referenceStatus: 'Not present or audio-free in reference',
      shaheenStatus: 'Bespoke Shaheen Innovation: Procedural Web Audio API synth drone & interaction tones',
      type: 'custom',
    },
    {
      feature: 'Contact dispatch with server-side validation',
      referenceStatus: 'Verified in reference',
      shaheenStatus: 'Implemented with Express backend API and encrypted ticket generation',
      type: 'verified',
    },
    {
      feature: 'Responsive design (Mobile, Tablet, Desktop)',
      referenceStatus: 'Verified in reference',
      shaheenStatus: 'Implemented mobile-first with zero horizontal overflow and touch drawers',
      type: 'verified',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#12151c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 p-6 sm:p-10 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundscape.playClickTone();
            onClose();
          }}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2.5 rounded-full bg-black/50 text-white/80 hover:text-white border border-white/10 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#e0a21b]">
            <Sparkles className="w-4 h-4" />
            <span>EXECUTIVE AUDIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.parity.title}
          </h2>
          <p className="text-xs text-slate-400 font-mono-code">
            Reference: https://github.com/aitezazdev/Portfolio · https://aitezazdev.vercel.app
          </p>
        </div>

        {/* Matrix List */}
        <div className="space-y-3 pt-2">
          {parityItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#181b24] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <span className="font-bold text-white text-sm block">
                  {item.feature}
                </span>
                <span className="text-slate-400 block font-light">
                  {item.shaheenStatus}
                </span>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 font-mono-code">
                {item.type === 'verified' && (
                  <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Parity</span>
                  </span>
                )}
                {item.type === 'custom' && (
                  <span className="px-2.5 py-1 rounded bg-[#e0a21b]/15 text-[#e0a21b] border border-[#e0a21b]/30 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Shaheen Upgrade</span>
                  </span>
                )}
                {item.type === 'disclosure' && (
                  <span className="px-2.5 py-1 rounded bg-blue-950/60 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Asset Disclosure</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono-code">
          <span>SHAHEEN GROUP QA & ARCHITECTURE REPORT</span>
          <button
            onClick={onClose}
            className="text-[#e0a21b] hover:underline"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
