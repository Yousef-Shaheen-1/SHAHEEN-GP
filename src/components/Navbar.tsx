import React, { useState } from 'react';
import { Language, NavView } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { AudioController } from './AudioController';
import { Globe, Menu, X, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenParity: () => void;
  onOpenDeveloperModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  onOpenParity,
  onOpenDeveloperModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems: { label: string; view: NavView }[] = [
    { label: t.nav.home, view: 'home' },
    { label: t.nav.projects, view: 'projects' },
    { label: lang === 'ar' ? 'الأدوات' : 'Tools', view: 'tools' },
    { label: lang === 'ar' ? 'الإضافات' : 'Extensions', view: 'extensions' },
    { label: t.nav.services, view: 'services' },
    { label: lang === 'ar' ? 'تطبيق الأندرويد' : 'Android APK', view: 'android' },
    { label: t.nav.journal, view: 'journal' },
    { label: lang === 'ar' ? 'قنوات التواصل' : 'Social Hub', view: 'social' },
    { label: t.nav.about, view: 'about' },
  ];


  const handleNavClick = (view: NavView) => {
    soundscape.playClickTone();
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0c0e12]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single Brand Wordmark / Emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left rtl:text-right focus:outline-none group shrink-0"
          aria-label="Shaheen Group Home"
        >
          <img
            src={import.meta.env.BASE_URL + 'assets/brand/shaheen-icon-transparent.png'}
            alt="SHAHEEN GROUP Emblem"
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(224,162,27,0.35)] transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap group-hover:text-[#e0a21b] transition-colors">
              SHAHEEN GROUP
            </span>
            <span className="text-[10px] tracking-widest text-[#e0a21b]/80 uppercase font-mono-code whitespace-nowrap">
              Mastermind
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs lg:text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`transition-colors whitespace-nowrap relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-[#e0a21b] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e0a21b] shadow-[0_0_8px_#e0a21b]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Controls & Actions (Fixed AudioController, Language, and CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Ambient Background Audio Controller as a fixed element */}
          <div className="shrink-0">
            <AudioController />
          </div>

          {/* Developer Identity Button (Mastermind Profile Modal trigger) */}
          <button
            onClick={() => {
              soundscape.playClickTone();
              onOpenDeveloperModal();
            }}
            className="hidden sm:flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#e0a21b]/40 hover:border-[#e0a21b] text-xs font-mono-code text-[#e0a21b] transition-all shadow-sm focus:outline-none shrink-0"
            title="Inspect Mastermind Developer Identity"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="font-bold">SHAHEEN ID</span>
          </button>

          {/* Bilingual Switcher */}
          <button
            onClick={() => {
              soundscape.playClickTone();
              onToggleLang();
            }}
            className="flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e0a21b]/50 text-xs font-medium text-slate-200 hover:text-[#e0a21b] transition-all focus:outline-none shrink-0"
            aria-label="Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-[#e0a21b]" />
            <span className="font-semibold uppercase tracking-wider">{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* CMS Admin Portal Direct Link */}
          <button
            onClick={() => handleNavClick('admin')}
            className="hidden md:inline-flex items-center h-9 px-2.5 text-xs text-slate-400 hover:text-white border border-transparent hover:border-white/10 rounded-xl transition-colors font-mono-code shrink-0"
          >
            CMS
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden lg:inline-flex items-center justify-center h-9 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f3b52d] active:scale-95 transition-all shadow-[0_0_20px_rgba(224,162,27,0.3)] rounded-lg whitespace-nowrap shrink-0"
          >
            {t.nav.contact}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c0e12]/95 border-b border-white/10 px-6 py-6 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-left rtl:text-right text-base font-medium py-2 transition-colors ${
                  currentView === item.view ? 'text-[#e0a21b] font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenDeveloperModal();
                  setMobileMenuOpen(false);
                }}
                className="text-left rtl:text-right text-sm text-[#e0a21b] py-1 flex items-center gap-2 font-mono-code"
              >
                <UserCheck className="w-4 h-4" />
                <span>SHAHEEN DEVELOPER ID</span>
              </button>
              <button
                onClick={() => {
                  handleNavClick('admin');
                }}
                className="text-left rtl:text-right text-sm text-slate-400 py-1 font-mono-code"
              >
                ⚙ {t.nav.admin}
              </button>
              <button
                onClick={() => {
                  onOpenParity();
                  setMobileMenuOpen(false);
                }}
                className="text-left rtl:text-right text-sm text-[#e0a21b] py-1 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> {t.nav.parity}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full mt-2 py-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-[#e0a21b] rounded-md shadow-md"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
