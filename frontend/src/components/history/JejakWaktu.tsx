'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimeTrail } from './TimeTrail';
import { HistoryScene } from './HistoryScene';
import { NavigationControls } from './NavigationControls';
import { cn } from '@/lib/utils';

export const TOTAL_STATES = 10;

export function JejakWaktu() {
  const [currentState, setCurrentState] = useState(0);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);

  const goToNext = useCallback(() => {
    if (isTransitioning.current) return;
    if (currentState < TOTAL_STATES - 1) {
      isTransitioning.current = true;
      setCurrentState(prev => prev + 1);
      setTimeout(() => (isTransitioning.current = false), 1200); // cooldown matches animation duration
    }
  }, [currentState]);

  const goToPrev = useCallback(() => {
    if (isTransitioning.current) return;
    if (currentState > 0) {
      isTransitioning.current = true;
      setCurrentState(prev => prev - 1);
      setTimeout(() => (isTransitioning.current = false), 1200);
    }
  }, [currentState]);

  useEffect(() => {
    // Disable native body scroll when on this page
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent rapid fire
      if (Math.abs(e.deltaY) < 20) return;
      
      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Threshold for swipe
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  return (
    <div className="relative w-full h-[100dvh] bg-cream text-stone-900 font-sans overflow-hidden">
      
      {/* SCENES */}
      <HistoryScene currentState={currentState} />

      {/* HORIZONTAL TIMELINE TRAIL */}
      <TimeTrail currentState={currentState} />

      {/* NAVIGATION CONTROLS */}
      <NavigationControls 
        currentState={currentState} 
        totalStates={TOTAL_STATES}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </div>
  );
}
