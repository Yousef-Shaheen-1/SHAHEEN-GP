import React, { useEffect } from 'react';
import { DeveloperProfile, SocialProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { 
  X, 
  MapPin, 
  Terminal, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Twitter,
  Linkedin,
  Send,
  MessageCircle,
  Instagram,
  Film,
  Facebook,
  Camera,
  AtSign,
  Hash,
  Youtube
} from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  developer: DeveloperProfile;
  socials: SocialProfile[];
  lang: Language;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({
  isOpen,
  onClose,
  developer,
  socials,
  lang,
}) => {
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Send':
        return <Send className="w-4 h-4" />;
      case 'MessageCircle':
        return <MessageCircle className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'Film':
        return <Film className="w-4 h-4" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'AtSign':
        return <AtSign className="w-4 h-4" />;
      case 'Hash':
        return <Hash className="w-4 h-4" />;
      case 'Youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="developer-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#12151c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-10 space-y-8">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundscape.playClickTone();
            onClose();
          }}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 transition-all focus:outline-none"
          aria-label="Close Developer Profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Block: Portrait + Mastermind Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
          
          {/* Portrait Container with Gold Rim Light */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-[#181b24] border-2 border-[#e0a21b]/40 shadow-[0_0_25px_rgba(224,162,27,0.25)] shrink-0">
            <img
              src={developer.image}
              alt={developer.displayName}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                // Graceful fallback to remote URL or brand icon
                (e.target as HTMLImageElement).src = 'https://i.postimg.cc/T2kSvNfR/IMG-20261022-112940-264.jpg';
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
          </div>

          {/* Identity Information */}
          <div className="space-y-3 text-center sm:text-left rtl:sm:text-right flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e0a21b]/10 border border-[#e0a21b]/30 text-xs font-mono-code text-[#e0a21b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{developer.identityStatement[lang]}</span>
            </div>

            <h2
              id="developer-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              {developer.displayName}
            </h2>

            {/* Slogan */}
            <p className="text-sm sm:text-base text-[#e0a21b] font-medium leading-snug">
              "{developer.slogan[lang]}"
            </p>

            {/* Location & Terminal Signature */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono-code pt-1">
              <span className="flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#e0a21b]" />
                <span>{developer.location[lang]}</span>
              </span>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#e0a21b]">
                <Terminal className="w-3.5 h-3.5" />
                <span>{developer.terminalPrompt}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Introduction */}
        <div className="p-5 rounded-2xl bg-[#181b24] border border-white/[0.06] text-sm text-slate-300 leading-relaxed font-light">
          {developer.introduction[lang]}
        </div>

        {/* Direct Transmission Emails */}
        <div className="space-y-3">
          <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
            Direct Mastermind Desks
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {developer.emailAddresses.map((em, idx) => (
              <a
                key={idx}
                href={em.url}
                onClick={() => soundscape.playClickTone()}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#e0a21b]/40 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#e0a21b]" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono-code block">{em.label}</span>
                    <span className="font-mono-code">{em.email}</span>
                  </div>
                </div>
                <span className="text-slate-600 group-hover:text-[#e0a21b] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media Shortcuts */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
            Verified Digital Channels
          </span>
          <div className="flex flex-wrap gap-2.5">
            {socials.filter(s => s.enabled).map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundscape.playClickTone()}
                className="px-3.5 py-2 rounded-xl bg-[#181b24] hover:bg-[#222734] border border-white/10 hover:border-[#e0a21b]/50 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs group"
              >
                <span className="text-[#e0a21b] group-hover:scale-110 transition-transform">
                  {renderSocialIcon(s.icon)}
                </span>
                <span>{s.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono-code">
          <span>SHAHEEN GROUP MASTERMIND ID · VERIFIED</span>
          <button
            onClick={onClose}
            className="text-[#e0a21b] hover:underline"
          >
            Close Identity Card
          </button>
        </div>
      </div>
    </div>
  );
};
