import React from 'react';
import { Language, NavView, SocialProfile } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { 
  Terminal, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  UserCheck,
  Twitter,
  Linkedin,
  Send,
  MessageCircle,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (view: NavView) => void;
  onOpenParity: () => void;
  onOpenDeveloperModal: () => void;
  onToggleLang: () => void;
  socials: SocialProfile[];
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenParity,
  onOpenDeveloperModal,
  onToggleLang,
  socials,
}) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#08090c] border-t border-white/[0.08] py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <img
                src={import.meta.env.BASE_URL + 'assets/brand/shaheen-icon-transparent.png'}
                alt="SHAHEEN GROUP Emblem"
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-bold text-white tracking-wide">
                SHAHEEN GROUP
              </span>
            </div>

            <p className="text-sm text-slate-300 font-light max-w-md leading-relaxed">
              "{t.footer.statement}" {t.footer.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#e0a21b]" />
                <span>{t.footer.location}</span>
              </span>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#e0a21b]">
                <Terminal className="w-3.5 h-3.5" />
                <span>{t.footer.terminal}</span>
              </span>
            </div>

            {/* Quick Social Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {socials.filter(s => !s.url.startsWith('mailto:') && s.enabled).slice(0, 6).map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundscape.playClickTone()}
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-[#e0a21b] border border-white/5 hover:border-[#e0a21b]/30 transition-all"
                  title={s.label}
                  aria-label={s.label}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-left rtl:text-right">
            <span className="text-xs font-mono-code uppercase tracking-wider text-white block">
              Platform Architecture
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('projects');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('tools');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'الأدوات وحزم الأوامر' : 'Sovereign Tools'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('extensions');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'الإضافات والتكاملات' : 'Extensions & Plugins'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('services');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('journal');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.journal}
                </button>
              </li>
            </ul>
          </div>

          {/* Mastermind & Administration (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-left rtl:text-right">
            <span className="text-xs font-mono-code uppercase tracking-wider text-white block">
              Identity & Governance
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onOpenDeveloperModal();
                  }}
                  className="hover:text-[#e0a21b] transition-colors flex items-center gap-1.5 font-mono-code text-[#e0a21b]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Developer Identity (SHAHEEN ID)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('social');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'مركز قنوات التواصل الكامل' : 'Verified Social Hub'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onOpenParity();
                  }}
                  className="hover:text-[#e0a21b] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#e0a21b]" />
                  <span>{t.nav.parity}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onNavigate('admin');
                  }}
                  className="hover:text-white transition-colors font-mono-code"
                >
                  Mastermind CMS Portal (Console)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundscape.playClickTone();
                    onToggleLang();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'النسخة العربية (Arabic)' : 'English Version'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono-code">
          <div>
            © {new Date().getFullYear()} SHAHEEN GROUP. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <span>Amman, Jordan</span>
            <span>·</span>
            <span>Mastermind Yousef A. Shaheen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
