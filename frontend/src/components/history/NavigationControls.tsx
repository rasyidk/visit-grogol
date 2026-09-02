'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationControlsProps {
  currentState: number;
  totalStates: number;
  onNext: () => void;
  onPrev: () => void;
}

export function NavigationControls({ currentState, totalStates, onNext, onPrev }: NavigationControlsProps) {
  const isFirst = currentState === 0;
  const isLast = currentState === totalStates - 1;

  // Year mapping just for the indicator
  const years = ['1916', '1916', '1927', '1946', '1947', '1965', '1996', '2014', '2021', 'KINI'];
  const activeYear = years[currentState];

  return (
    <>
      {/* Right side navigation indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-50">
        
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className={cn(
            "p-3 rounded-full bg-white/50 backdrop-blur-sm border border-stone-200 text-stone-600 transition-all shadow-sm hover:bg-white hover:text-brand-700",
            isFirst && "opacity-0 pointer-events-none"
          )}
          aria-label="Previous Era"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="h-24 w-[1px] bg-stone-300 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-brand-700"
              initial={false}
              animate={{ height: `${(currentState / (totalStates - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>
          <div className="font-display text-xs font-bold tracking-widest text-stone-500 rotate-90 my-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeYear}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {activeYear}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <button 
          onClick={onNext}
          disabled={isLast}
          className={cn(
            "p-3 rounded-full bg-white/50 backdrop-blur-sm border border-stone-200 text-stone-600 transition-all shadow-sm hover:bg-white hover:text-brand-700",
            isLast && "opacity-0 pointer-events-none"
          )}
          aria-label="Next Era"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Scroll Hint */}
      <AnimatePresence>
        {isFirst && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center z-50 text-stone-500"
          >
            <span 
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
              style={{ paddingLeft: '0.3em' }}
            >
              Scroll Untuk Menjelajahi
            </span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-[1px] h-12 bg-stone-400 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
