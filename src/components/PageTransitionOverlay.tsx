import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  onTransitionEnd: () => void;
}

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  isTransitioning,
  onTransitionEnd,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTransitioning || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: onTransitionEnd,
    });

    tl.set(overlayRef.current, { display: 'flex', opacity: 0 })
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      })
      .fromTo(
        streakRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.35, ease: 'expo.out' }
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        delay: 0.1,
      })
      .set(overlayRef.current, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [isTransitioning, onTransitionEnd]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] hidden items-center justify-center bg-[#07090d]/90 backdrop-blur-md pointer-events-none transition-opacity"
    >
      <div className="w-full max-w-md px-6 text-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#e0a21b] to-transparent mb-3" ref={streakRef} />
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#e0a21b]/80">
          COMMANDING PERSPECTIVE...
        </span>
      </div>
    </div>
  );
};
