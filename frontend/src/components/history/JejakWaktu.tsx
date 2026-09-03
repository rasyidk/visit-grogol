'use client';

import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { TimeTrail } from './TimeTrail';
import { HistoryScene } from './HistoryScene';
import { NavigationControls } from './NavigationControls';

export const TOTAL_STATES = 10;

export function JejakWaktu() {
  const [currentState, setCurrentState] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let state = Math.floor(latest * TOTAL_STATES);
    if (state >= TOTAL_STATES) state = TOTAL_STATES - 1;
    if (state < 0) state = 0;
    setCurrentState(state);
  });

  const goToNext = () => {
    if (currentState < TOTAL_STATES - 1) {
      const nextState = currentState + 1;
      const container = containerRef.current;
      if (container) {
        const scrollableDistance = container.scrollHeight - window.innerHeight;
        // target the beginning of the next state block, plus a small buffer
        const targetProgress = (nextState + 0.1) / TOTAL_STATES;
        const targetScroll = container.offsetTop + (targetProgress * scrollableDistance);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const goToPrev = () => {
    if (currentState > 0) {
      const prevState = currentState - 1;
      const container = containerRef.current;
      if (container) {
        const scrollableDistance = container.scrollHeight - window.innerHeight;
        const targetProgress = (prevState + 0.1) / TOTAL_STATES;
        const targetScroll = container.offsetTop + (targetProgress * scrollableDistance);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${TOTAL_STATES * 100}vh` }}>
      {/* Sticky Container for the Scenes */}
      <div className="sticky top-0 w-full h-[100dvh] bg-cream text-stone-900 font-sans overflow-hidden">
        
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
    </div>
  );
}
