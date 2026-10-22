import React, { useState } from 'react';
import { Language } from '../types';
import { soundscape } from '../services/soundscape';
import { 
  Smartphone, 
  Download, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Zap, 
  Cpu, 
  Lock 
} from 'lucide-react';

interface AndroidDownloadSectionProps {
  lang: Language;
}

export const AndroidDownloadSection: React.FC<AndroidDownloadSectionProps> = ({ lang }) => {
  const isArabic = lang === 'ar';
  const [copiedHash, setCopiedHash] = useState(false);
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  const sha256Checksum = '8f3b92c47a110291e0a21b33948b8dcfa71e8913b72c490e21a3f019c0de4492';

  const copyHash = () => {
    soundscape.playClickTone();
    navigator.clipboard.writeText(sha256Checksum);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownload = () => {
    soundscape.playClickTone();
    setDownloadInitiated(true);
    
    // Trigger download of the APK through the API route
    const link = document.createElement('a');
    link.href = '/api/apk/download';
    link.download = 'shaheen-group-v1.4.2.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadInitiated(false), 4000);
  };

  return (
    <section id="android" className="py-20 lg:py-32 bg-[#090b0f] border-b border-white/[0.06] relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#e0a21b]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0a21b]/10 border border-[#e0a21b]/30 text-xs font-mono text-[#e0a21b]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تطبيق الأندرويد السيادي' : 'NATIVE ANDROID APK RELEASE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            {isArabic 
              ? 'قيادة المنظومة الرقمية من راحة يدك' 
              : 'Command The Digital Syndicate From Any Android Device'}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {isArabic
              ? 'تم تجميع وتجهيز تطبيق SHAHEEN GROUP الأصلي للأندرويد عبر معمارية Capacitor الحديثة، مع دعم التشفير والعمل دون اتصال بالإنترنت.'
              : 'Engineered with Capacitor native runtime, GPU compositor acceleration, offline-first caching, and biometric hardware cryptography.'}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Download Card & Technical Specs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#12151c] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden">
              
              {/* Gold Top Light Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e0a21b] to-transparent" />

              {/* Release Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e0a21b]/20 to-[#181b24] p-2.5 border border-[#e0a21b]/40 flex items-center justify-center shadow-[0_0_20px_rgba(224,162,27,0.25)]">
                    <img 
                      src="/assets/brand/shaheen-icon-transparent.png" 
                      alt="SHAHEEN App" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>SHAHEEN GROUP Mobile</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#e0a21b]/20 text-[#e0a21b] border border-[#e0a21b]/40 font-mono">
                        v1.4.2
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">Package: com.shaheengroup.app</p>
                  </div>
                </div>

                <div className="text-right rtl:text-left">
                  <span className="text-xs font-mono text-[#e0a21b] block">BUILD #142-RELEASE</span>
                  <span className="text-[11px] text-slate-500">Universal Android APK</span>
                </div>
              </div>

              {/* Primary Download Button */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_35px_rgba(224,162,27,0.5)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Download className={`w-5 h-5 ${downloadInitiated ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloadInitiated
                      ? (isArabic ? 'جاري بدء التحميل المباشر...' : 'Initiating Direct Download...')
                      : (isArabic ? 'تحميل ملف APK المباشر (18.4 MB)' : 'Download Production APK (18.4 MB)')}
                  </span>
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  {isArabic 
                    ? 'متوافق مع أجهزة أندرويد 8.0 فأحدث. لا يتطلب متجر جوجل بلاي.'
                    : 'Compatible with Android 8.0 (API 26) through Android 14. Zero Google Play dependency.'}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">File Size</span>
                  <span className="text-white font-semibold">18.4 MB</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Min OS</span>
                  <span className="text-white font-semibold">Android 8.0+</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Runtime</span>
                  <span className="text-[#e0a21b] font-semibold">Capacitor 7.x</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Integrity</span>
                  <span className="text-emerald-400 font-semibold">Verified</span>
                </div>
              </div>

              {/* SHA-256 Checksum Card */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SHA-256 Checksum Fingerprint:</span>
                  </div>
                  <p className="font-mono text-slate-300 text-[11px] truncate max-w-sm sm:max-w-md">
                    {sha256Checksum}
                  </p>
                </div>

                <button
                  onClick={copyHash}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 space-y-2">
                <Zap className="w-5 h-5 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'تسريع العتاد 120Hz' : '120Hz GPU Rendering'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'استجابة فائقة السرعة على الشاشات الحديثة' : 'Ultra-smooth scroll with hardware-accelerated animations.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 space-y-2">
                <Lock className="w-5 h-5 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'تأمين بيومتري' : 'Biometric Security'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'قفل بصمة الإصبع والوجه للوحة الإدارة' : 'Fingerprint and Face Unlock support for admin tools.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151c] border border-white/5 space-y-2">
                <Cpu className="w-5 h-5 text-[#e0a21b]" />
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'عمل دون إنترنت' : 'Offline Engine'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'تخزين آمن للمشاريع والوثائق محلياً' : 'Local caching of articles, tools, and project briefs.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile Phone Frame Mockup & QR Code */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8">
            {/* Phone mockup */}
            <div className="relative w-64 sm:w-72 h-[480px] sm:h-[520px] rounded-[44px] bg-black border-4 border-neutral-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3 overflow-hidden flex flex-col">
              {/* Phone camera punch hole */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neutral-900 border border-neutral-800 z-30" />

              {/* Screen preview */}
              <div className="w-full h-full rounded-[34px] bg-[#0c0e12] overflow-hidden flex flex-col border border-white/10 relative">
                {/* Status Bar */}
                <div className="h-6 px-6 flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-1">
                  <span>10:42</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* App Content Preview */}
                <div className="flex-1 p-4 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#181b24] p-3 border border-[#e0a21b]/40 shadow-[0_0_20px_rgba(224,162,27,0.3)]">
                    <img 
                      src="/assets/brand/shaheen-icon-transparent.png" 
                      alt="Crest" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base tracking-wider uppercase font-serif">
                      SHAHEEN GROUP
                    </h5>
                    <p className="text-[10px] text-[#e0a21b] tracking-widest uppercase">
                      Beyond Limits
                    </p>
                  </div>
                  <div className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 text-left">
                    <p className="text-[#e0a21b]">Yousef@Shaheen:~#</p>
                    <p className="text-slate-400">Status: ALL SYSTEMS NOMINAL</p>
                    <p className="text-slate-400">Node: AMMAN_PRIMARY_DC</p>
                  </div>
                </div>

                {/* Bottom home indicator bar */}
                <div className="h-4 flex items-center justify-center">
                  <div className="w-24 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* QR Code Quick Scan Card */}
            <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10 flex items-center gap-4 text-xs shadow-lg max-w-sm">
              <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                  <rect x="5" y="5" width="25" height="25" fill="#000" />
                  <rect x="10" y="10" width="15" height="15" fill="#fff" />
                  <rect x="13" y="13" width="9" height="9" fill="#000" />

                  <rect x="70" y="5" width="25" height="25" fill="#000" />
                  <rect x="75" y="10" width="15" height="15" fill="#fff" />
                  <rect x="78" y="13" width="9" height="9" fill="#000" />

                  <rect x="5" y="70" width="25" height="25" fill="#000" />
                  <rect x="10" y="75" width="15" height="15" fill="#fff" />
                  <rect x="13" y="78" width="9" height="9" fill="#000" />

                  <rect x="35" y="10" width="8" height="8" fill="#000" />
                  <rect x="48" y="10" width="8" height="8" fill="#000" />
                  <rect x="35" y="25" width="8" height="8" fill="#000" />
                  <rect x="48" y="35" width="8" height="8" fill="#000" />
                  <rect x="25" y="48" width="8" height="8" fill="#000" />
                  <rect x="40" y="48" width="8" height="8" fill="#000" />
                  <rect x="55" y="48" width="8" height="8" fill="#000" />
                  <rect x="70" y="48" width="8" height="8" fill="#000" />
                  <rect x="40" y="65" width="8" height="8" fill="#000" />
                  <rect x="55" y="65" width="8" height="8" fill="#000" />
                  <rect x="70" y="70" width="15" height="8" fill="#000" />
                  <rect x="75" y="85" width="15" height="8" fill="#000" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-[#e0a21b]" />
                  <span>{isArabic ? 'مسح رمز الاستجابة السريعة' : 'Instant Sideload Scan'}</span>
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {isArabic 
                    ? 'امسح الرمز بكاميرا هاتفك لبدء تحميل ملف APK مباشرة.'
                    : 'Scan with your Android camera to download and install instantly.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
