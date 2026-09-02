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
    <div className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-30">
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

        {/* Nodes */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((state) => {
          // Calculate roughly where these lie on the path
          // This is a simple linear map across the X axis for the visual nodes
          const xPos = (state / 9) * 1000;
          // Calculate Y based on the bezier curve roughly
          // Simple sine wave approximation for the visual
          const yPos = 100 + Math.sin(xPos / 100) * 20;

          const isActive = currentState === state;
          const isPast = currentState > state;

          return (
            <motion.circle
              key={state}
              cx={xPos}
              cy={yPos}
              r={isActive ? 6 : 4}
              className={isActive ? "fill-brand-700" : isPast ? "fill-stone-400" : "fill-stone-300"}
              initial={false}
              animate={{
                r: isActive ? 6 : 4,
                opacity: currentState === 0 || currentState === 9 ? 0 : 1 // Hide nodes on hero and outro
              }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
