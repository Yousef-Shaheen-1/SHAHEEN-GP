import React from 'react';
import { SocialProfile, Language } from '../types';
import { soundscape } from '../services/soundscape';
import { 
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
  Youtube, 
  Mail, 
  ExternalLink,
  Globe
} from 'lucide-react';

interface SocialSectionProps {
  socials: SocialProfile[];
  lang: Language;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ socials, lang }) => {
  const isArabic = lang === 'ar';

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      case 'Linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'Send':
        return <Send className="w-5 h-5" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5" />;
      case 'Film':
        return <Film className="w-5 h-5" />;
      case 'Facebook':
        return <Facebook className="w-5 h-5" />;
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      case 'AtSign':
        return <AtSign className="w-5 h-5" />;
      case 'Hash':
        return <Hash className="w-5 h-5" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5" />;
      case 'Mail':
        return <Mail className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <section id="social" className="py-20 lg:py-28 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
            {isArabic ? 'القنوات الرسمية' : 'Digital Communications'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {isArabic ? 'مركز التواصل والشبكات الرقمية' : 'The Shaheen Social Hub'}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {isArabic
              ? 'تواصل مباشرة عبر كافة المنصات الرقمية المعتمدة لمجموعة شاهين وإدارة العقل المدبر.'
              : 'Direct verified communication channels, professional networks, and community dispatches.'}
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {socials.filter(s => s.enabled).map((item) => {
            const isEmail = item.url.startsWith('mailto:');
            return (
              <a
                key={item.id}
                href={item.url}
                target={isEmail ? '_self' : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                onClick={() => soundscape.playClickTone()}
                className="p-5 rounded-2xl bg-[#12151c] hover:bg-[#181b24] border border-white/[0.08] hover:border-[#e0a21b]/50 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#181b24] group-hover:bg-[#e0a21b]/15 text-[#e0a21b] flex items-center justify-center border border-white/5 group-hover:border-[#e0a21b]/30 transition-colors">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-[#e0a21b] transition-colors block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono-code block truncate max-w-[140px]">
                      {item.platform}
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-[#e0a21b] transition-transform group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
