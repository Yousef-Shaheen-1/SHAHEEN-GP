// Dual-engine cinematic ambient audio system
// Primary: HTML5 Audio element loading /assets/audio/shaheen-ambient.mp3
// Secondary / Fallback: Procedural Web Audio API synth drone

type AudioStateListener = (isPlaying: boolean, isMuted: boolean, volume: number) => void;

class SoundscapeEngine {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private usingFallbackSynth: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedPref = localStorage.getItem('shaheen_audio_pref');
        if (savedPref) {
          const parsed = JSON.parse(savedPref);
          this.volume = typeof parsed.volume === 'number' ? parsed.volume : 0.4;
          this.isMuted = !!parsed.isMuted;
        }
      } catch {
        // storage fallback
      }
    }
  }

  public subscribe(listener: AudioStateListener) {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted, this.volume);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying, this.isMuted, this.volume));
    try {
      localStorage.setItem('shaheen_audio_pref', JSON.stringify({
        isMuted: this.isMuted,
        volume: this.volume,
      }));
    } catch {
      // storage fallback
    }
  }

  private initAudioElement() {
    if (this.audioElement || typeof window === 'undefined') return;

    try {
      this.audioElement = new Audio(import.meta.env.BASE_URL + 'assets/audio/shaheen-ambient.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      this.audioElement.addEventListener('error', () => {
        console.warn('[Soundscape] HTML5 audio asset unavailable, falling back to Web Audio synth drone');
        this.usingFallbackSynth = true;
        if (this.isPlaying) {
          this.startSynthDrone();
        }
      });
    } catch {
      this.usingFallbackSynth = true;
    }
  }

  private initWebAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.25, this.ctx.currentTime);

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(160, this.ctx.currentTime);

        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  private startSynthDrone() {
    this.initWebAudioContext();
    if (!this.ctx || !this.masterGain || !this.filterNode) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      this.stopSynthDrone();

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();

      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1

      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.droneOsc1.connect(this.filterNode);
      this.droneOsc2.connect(this.filterNode);
      this.filterNode.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.volume * 0.25,
        this.ctx.currentTime + 1.2
      );
    } catch (e) {
      console.warn('[Soundscape] Synth start error', e);
    }
  }

  private stopSynthDrone() {
    try {
      this.droneOsc1?.stop();
      this.droneOsc2?.stop();
      this.droneOsc1?.disconnect();
      this.droneOsc2?.disconnect();
    } catch {
      // ignore
    }
    this.droneOsc1 = null;
    this.droneOsc2 = null;
  }

  public togglePlay(): boolean {
    this.initAudioElement();

    if (!this.isPlaying) {
      this.isPlaying = true;

      if (!this.usingFallbackSynth && this.audioElement) {
        this.audioElement.volume = this.isMuted ? 0 : this.volume;
        this.audioElement.play().catch((err) => {
          console.warn('[Soundscape] Audio play error, using synth drone', err);
          this.usingFallbackSynth = true;
          this.startSynthDrone();
        });
      } else {
        this.startSynthDrone();
      }
    } else {
      this.isPlaying = false;
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.stopSynthDrone();
    }

    this.notify();
    return this.isPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume * 0.25,
        this.ctx.currentTime
      );
    }

    this.notify();
    return this.isMuted;
  }

  public setVolume(level: number) {
    const clamped = Math.max(0, Math.min(1, level));
    this.volume = clamped;
    if (this.isMuted && clamped > 0) {
      this.isMuted = false;
    }

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : clamped;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : clamped * 0.25,
        this.ctx.currentTime
      );
    }

    this.notify();
  }

  public playClickTone() {
    if (this.isMuted) return;
    this.initWebAudioContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // audio safety
    }
  }

  public getPlaybackState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }
}

export const soundscape = new SoundscapeEngine();
