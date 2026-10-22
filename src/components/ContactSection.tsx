import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { soundscape } from '../services/soundscape';
import { sendContactDispatch } from '../services/api';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; msg: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(t.contact.errorFill);
      return;
    }

    setIsSubmitting(true);
    soundscape.playClickTone();

    const response = await sendContactDispatch({
      name,
      email,
      subject,
      message,
    });

    setIsSubmitting(false);

    if (response.success && response.dispatchId) {
      setSuccessInfo({
        id: response.dispatchId,
        msg: response.message || t.contact.successMessage,
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setErrorMsg(response.error || 'Failed to transmit dispatch to server.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#0c0e12] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct HQ & Inquiry Scope */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#e0a21b] block">
                {t.contact.kicker}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
                {t.contact.title}
              </h2>
              <p className="text-base text-slate-400 font-light leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Direct Channels */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-white/[0.08] space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#181b24] text-[#e0a21b] border border-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono-code block">
                    {t.contact.directHQ}
                  </span>
                  <span className="text-white font-medium">
                    {t.contact.hqAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/[0.06]">
                <div className="p-2.5 rounded-lg bg-[#181b24] text-[#e0a21b] border border-white/5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono-code block">
                    {t.contact.directEmail}
                  </span>
                  <a
                    href="mailto:yousef@shaheen-group.com"
                    className="text-[#e0a21b] hover:underline font-mono-code text-xs"
                  >
                    {t.contact.directEmailVal}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1">
              <span className="text-white font-semibold block">Encrypted Transmission</span>
              <p className="font-light">
                Dispatches are cryptographically validated by our backend server running in the Amman mastermind cluster.
              </p>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#12151c] border border-white/[0.08] shadow-2xl">
              
              {successInfo ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#e0a21b]/20 border border-[#e0a21b] flex items-center justify-center text-[#e0a21b]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    {successInfo.msg}
                  </p>
                  <div className="px-4 py-2 rounded-lg bg-[#181b24] border border-white/10 font-mono-code text-xs text-[#e0a21b]">
                    Ticket ID: {successInfo.id}
                  </div>
                  <button
                    onClick={() => setSuccessInfo(null)}
                    className="mt-4 px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f3b52d] transition-all"
                  >
                    {t.contact.resetForm}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs animate-fadeIn">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-lg bg-[#181b24] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e0a21b] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
                        {t.contact.emailLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-lg bg-[#181b24] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e0a21b] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
                      {t.contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-[#181b24] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e0a21b] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-[#181b24] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e0a21b] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#e0a21b] hover:bg-[#f3b52d] disabled:opacity-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(224,162,27,0.3)]"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.sending}</span>
                    ) : (
                      <>
                        <span>{t.contact.sendButton}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
