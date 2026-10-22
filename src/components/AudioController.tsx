import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sliders } from 'lucide-react';

interface AudioPreferences {
  volume: number;
  isMuted: boolean;
  userPrefersAudio?: boolean;
}

const STORAGE_KEY = 'shaheen_audio_controller_pref';
const AUDIO_ASSET_PATH = '/assets/audio/shaheen-ambient.mp3';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [showVolumePopover, setShowVolumePopover] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const isFallbackSynth = useRef<boolean>(false);

  // 1. Initialize audio element & restore user preferences from localStorage
  useEffect(() => {
    let savedVolume = 0.4;
    let savedMuted = false;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AudioPreferences = JSON.parse(stored);
        if (typeof parsed.volume === 'number') {
          savedVolume = Math.max(0, Math.min(1, parsed.volume));
        }
        if (typeof parsed.isMuted === 'boolean') {
          savedMuted = parsed.isMuted;
        }
      }
    } catch (e) {
      console.warn('[AudioController] Storage read error', e);
    }

    setVolume(savedVolume);
    setIsMuted(savedMuted);

    // Create the audio element pointing to royalty-free loop in public assets
    const audio = new Audio(AUDIO_ASSET_PATH);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = savedMuted ? 0 : savedVolume;

    audio.addEventListener('canplaythrough', () => {
      setIsReady(true);
    });

    audio.addEventListener('error', () => {
      console.warn('[AudioController] Asset error, enabling procedural Web Audio synth fallback');
      isFallbackSynth.current = true;
      setIsReady(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      stopSynth();
    };
  }, []);

  // 2. Persist preferences to localStorage whenever volume or muted state changes
  const persistPreferences = (newVolume: number, newMuted: boolean, userPlayPref: boolean) => {
    try {
      const prefs: AudioPreferences = {
        volume: newVolume,
        isMuted: newMuted,
        userPrefersAudio: userPlayPref,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('[AudioController] Storage write error', e);
    }
  };

  // 3. Fallback Web Audio Synthesizer (Zero-dependency backup)
  const startSynth = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopSynth();

      const ctx = audioCtxRef.current;
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz A1 root

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime); // 82.4Hz E2 fifth

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      const effectiveVol = isMuted ? 0 : volume * 0.15;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(effectiveVol, ctx.currentTime + 1.0);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      synthGainRef.current = gain;
    } catch (e) {
      console.warn('[AudioController] Synth initialization error', e);
    }
  };

  const stopSynth = () => {
    try {
      if (synthGainRef.current && audioCtxRef.current) {
        synthGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.3);
      }
      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          osc1Ref.current?.disconnect();
          osc2Ref.current?.disconnect();
        } catch {
          // ignore already stopped
        }
        osc1Ref.current = null;
        osc2Ref.current = null;
      }, 350);
    } catch {
      // safe cleanup
    }
  };

  // Subtle UI click haptic tone
  const playClickTone = () => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, ctx.currentTime); // G5 note
      osc.frequency.exponentialRampToValueAtTime(392, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // safe
    }
  };

  // 4. Primary Play / Pause Toggle
  const handleTogglePlay = () => {
    playClickTone();

    if (!isPlaying) {
      setIsPlaying(true);
      persistPreferences(volume, isMuted, true);

      if (!isFallbackSynth.current && audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch((err) => {
          console.warn('[AudioController] Audio play failed or blocked, switching to synth', err);
          isFallbackSynth.current = true;
          startSynth();
        });
      } else {
        startSynth();
      }
    } else {
      setIsPlaying(false);
      persistPreferences(volume, isMuted, false);

      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynth();
    }
  };

  // 5. Mute / Unmute Toggle
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickTone();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    if (synthGainRef.current && audioCtxRef.current) {
      synthGainRef.current.gain.setValueAtTime(
        nextMuted ? 0 : volume * 0.15,
        audioCtxRef.current.currentTime
      );
    }

    persistPreferences(volume, nextMuted, isPlaying);
  };

  // 6. Volume Slider Handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);

    let nextMuted = isMuted;
    if (isMuted && newVol > 0) {
      nextMuted = false;
      setIsMuted(false);
    }

    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : newVol;
    }
    if (synthGainRef.current && audioCtxRef.current) {
      synthGainRef.current.gain.setValueAtTime(
        nextMuted ? 0 : newVol * 0.15,
        audioCtxRef.current.currentTime
      );
    }

    persistPreferences(newVol, nextMuted, isPlaying);
  };

  return (
    <div className="relative inline-flex items-center shrink-0">
      {/* State-Based Audio Controller Container - Exactly matching language switcher height and border styling */}
      <div
        className={`flex items-center gap-1 h-9 px-1.5 rounded-xl transition-all duration-300 border ${
          isPlaying
            ? 'bg-[#12151c]/95 border-[#e0a21b]/70 shadow-[0_0_15px_rgba(224,162,27,0.25)]'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-[#e0a21b]/50'
        }`}
      >
        {/* Main Play / Pause Button with Reactive State */}
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 h-7 px-2 sm:px-2.5 rounded-lg text-xs font-medium transition-all focus:outline-none select-none ${
            isPlaying
              ? 'bg-[#e0a21b] text-black font-bold shadow-[0_0_10px_rgba(224,162,27,0.35)]'
              : 'text-slate-200 hover:text-[#e0a21b]'
          }`}
          title={isPlaying ? 'Pause Cinematic Ambient Audio' : 'Play Cinematic Ambient Audio'}
          aria-label={isPlaying ? 'Pause Cinematic Audio' : 'Play Cinematic Audio'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono-code text-[11px] tracking-wider uppercase hidden sm:inline">
                SOUND ON
              </span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#e0a21b] fill-current" />
              <span className="font-mono-code text-[11px] tracking-wider uppercase hidden sm:inline">
                SOUND
              </span>
            </>
          )}
        </button>

        {/* State-dependent Quick Mute Button (Rendered when playing) */}
        {isPlaying && (
          <button
            onClick={handleToggleMute}
            className={`h-7 w-7 flex items-center justify-center rounded-lg transition-colors focus:outline-none ${
              isMuted
                ? 'text-red-400 bg-red-950/60 hover:bg-red-900/60'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#e0a21b]" />}
          </button>
        )}

        {/* Volume Settings Toggle */}
        {isPlaying && (
          <button
            onClick={() => setShowVolumePopover(!showVolumePopover)}
            className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            title="Adjust Volume"
            aria-label="Adjust Volume"
            aria-expanded={showVolumePopover}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Live Audio Equalizer Waveform Animation */}
        {isPlaying && !isMuted && (
          <div
            className="hidden sm:flex items-end gap-[3px] h-3 px-1 py-0.5"
            aria-hidden="true"
          >
            <span className="w-[2px] h-3 bg-[#e0a21b] rounded-full animate-pulse" />
            <span className="w-[2px] h-1.5 bg-[#e0a21b]/80 rounded-full animate-pulse [animation-duration:600ms]" />
            <span className="w-[2px] h-2.5 bg-[#e0a21b] rounded-full animate-pulse [animation-duration:400ms]" />
          </div>
        )}
      </div>

      {/* Expandable Volume Popover */}
      {showVolumePopover && isPlaying && (
        <div className="absolute top-full mt-2 right-0 p-3 rounded-xl bg-[#181b24] border border-[#e0a21b]/30 shadow-2xl z-50 flex items-center gap-3 w-48 animate-fadeIn">
          <Volume2 className="w-4 h-4 text-[#e0a21b] shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#e0a21b] h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            aria-label="Volume Slider"
          />
          <span className="text-[11px] font-mono-code text-slate-300 tabular-nums w-8 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioController;
