'use client';

import { motion } from 'framer-motion';

interface TimeTrailProps {
  currentState: number;
}

export function TimeTrail({ currentState }: TimeTrailProps) {
  // We want the trail to be a gentle curve across the bottom third of the screen
  // And the nodes to represent states 1 through 8 (Hero is 0, Outro is 9)
  
  // Normalized progress from 0 to 1 based on state
  // If state is 0, progress is 0. If state is 9, progress is 1.
  const progress = currentState / 9;

  return (
    <div className="absolute bottom-0 left-0 w-full h-[25vh] lg:h-[20vh] pointer-events-none z-30 opacity-70">
      <svg 
        className="w-full h-full" 
        preserveAspectRatio="none"
        viewBox="0 0 1000 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Trace */}
        <path
          d="M -100 100 C 200 150, 300 50, 500 100 C 700 150, 800 50, 1100 100"
          stroke="currentColor"
          className="text-stone-300"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />

        {/* Active Trace */}
        <motion.path
          d="M -100 100 C 200 150, 300 50, 500 100 C 700 150, 800 50, 1100 100"
          stroke="currentColor"
          className="text-brand-700"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

      </svg>
      
      {/* Nodes */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((state) => {
        const leftPercent = (state / 9) * 100;
        const xPos = (state / 9) * 1000;
        const yPos = 100 + Math.sin(xPos / 100) * 20;
        const topPercent = (yPos / 200) * 100;

        const isActive = currentState === state;
        const isPast = currentState > state;

        return (
          <motion.div
            key={state}
            className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${isActive ? "bg-brand-700" : isPast ? "bg-stone-400" : "bg-stone-300"}`}
            style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            initial={false}
            animate={{
              width: isActive ? 12 : 8,
              height: isActive ? 12 : 8,
              opacity: currentState === 0 || currentState === 9 ? 0 : 1
            }}
            transition={{ duration: 0.5 }}
          />
        );
      })}
    </div>
  );
}
