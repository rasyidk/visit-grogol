'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface HistorySceneProps {
  currentState: number;
}

export function HistoryScene({ currentState }: HistorySceneProps) {
  const t = useTranslations('KisahKami');
  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        
        {/* STATE 00: HERO */}
        {currentState === 0 && (
          <SceneWrapper key="state-0">
            <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 relative">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/vintage-history/1920/1080')] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none" />
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-display font-black text-[12vw] sm:text-[8vw] lg:text-[7rem] tracking-tighter leading-[0.85] uppercase mb-8"
                style={{ paddingRight: '0.05em' }}
              >
                {t('title1')} <br />
                <span className="text-brand-700">{t('title2')}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl sm:text-2xl italic text-stone-600 max-w-2xl"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute top-[15vh] lg:top-[20vh] font-display font-bold text-xl tracking-[0.5em] text-brand-800"
              >
                {t('date0')}
              </motion.div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 01: 1916 */}
        {currentState === 1 && (
          <SceneWrapper key="state-1">
            <div className="w-full h-full flex items-center pl-6 pr-16 lg:pl-24 lg:pr-[140px] pb-[25vh] lg:pb-0">
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                  className="font-display font-black text-6xl lg:text-[10rem] tracking-tighter leading-none text-brand-800 opacity-[0.15] mb-2 lg:mb-4"
                >
                  1916
                </motion.div>
                
                <h3 className="font-display text-2xl lg:text-4xl font-bold uppercase tracking-widest text-stone-900 mb-4 lg:mb-6">{t('state1Title')}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-stone-700">
                  {t('state1Text')}
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 02: 1927 */}
        {currentState === 2 && (
          <SceneWrapper key="state-2">
            <div className="w-full h-full flex items-center justify-start lg:justify-end pl-6 pr-16 lg:pl-32 lg:pr-[140px] pb-[25vh] lg:pb-0">
              <div className="max-w-2xl text-left lg:text-right">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                  className="font-display font-black text-6xl lg:text-[10rem] tracking-tighter text-brand-800 opacity-[0.15] mb-2 lg:mb-6"
                >
                  1927
                </motion.div>
                
                <div className="inline-block text-left max-w-lg mt-4 lg:mt-8">
                  <div className="w-16 h-[1px] bg-brand-700 mb-4 lg:mb-8" />
                  <h3 className="font-display text-2xl lg:text-4xl font-bold uppercase tracking-widest text-stone-900 mb-2">{t('state2Title')}</h3>
                  <p className="italic text-base text-stone-500 mb-6">{t('state2Year')}</p>
                  <p className="text-base lg:text-lg leading-relaxed text-stone-800">
                    {t('state2Text')}
                  </p>
                </div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 03: 1946 ({t('state3Name')} & Catatan Hilang) */}
        {currentState === 3 && (
          <SceneWrapper key="state-3">
            <div className="w-full h-full flex items-center justify-center px-4 bg-stone-900 text-stone-200 pb-[25vh] lg:pb-0">
              <div className="max-w-4xl text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                  className="text-stone-500 font-display text-4xl lg:text-6xl mb-4 lg:mb-8"
                >
                  1946
                </motion.div>
                <h2 className="font-display font-black text-4xl lg:text-7xl uppercase text-white mb-2 lg:mb-6">Arjo Sukarso</h2>
                <p className="text-xl lg:text-2xl italic text-stone-400 mb-6 lg:mb-12">{t('state3Role')}</p>
                
                <div className="w-12 lg:w-16 h-[1px] bg-stone-700 mx-auto mb-6 lg:mb-12" />
                
                <p className="text-base lg:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">
                  {t('state3Text')}
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 04: 1947 */}
        {currentState === 4 && (
          <SceneWrapper key="state-4">
            <div className="w-full h-full flex items-center pl-6 pr-16 lg:pl-32 lg:pr-[140px] pb-[25vh] lg:pb-0">
              <div className="max-w-xl">
                <div className="font-display font-black text-4xl lg:text-6xl tracking-tighter text-brand-700 mb-2 lg:mb-4">1947 — 1965</div>
                <h2 className="font-display font-black text-4xl lg:text-7xl uppercase text-stone-900 mb-4 lg:mb-6">{t('state4Name')}</h2>
                <p className="text-base lg:text-lg leading-relaxed text-stone-700">
                  {t('state4Text')}
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 05: 1965 ({t('state5Name')}) */}
        {currentState === 5 && (
          <SceneWrapper key="state-5">
            <div className="w-full h-full flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between pl-6 pr-16 lg:pl-24 lg:pr-[140px] pt-12 lg:pt-24 pb-[25vh] lg:pb-32 overflow-hidden">
              <div className="flex-1 lg:pr-12 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display font-black text-6xl lg:text-[10rem] tracking-tighter leading-[0.8] text-brand-800 opacity-[0.15] mb-2 lg:mb-4"
                >
                  1965
                </motion.div>
                <h2 className="font-display font-black text-4xl lg:text-7xl uppercase text-stone-900 mb-2 lg:mb-4">Hadi Suwarno</h2>
                <h3 className="font-display text-xl lg:text-2xl font-bold tracking-widest text-brand-700 mb-4 lg:mb-6">{t('state5Role')}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-stone-700 max-w-md">
                  {t('state5Text')}
                </p>
              </div>
              
              <div className="flex-1 w-full mt-4 lg:mt-0 space-y-4 lg:space-y-12 pl-0 lg:pl-12 border-l-0 lg:border-l border-stone-300">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm text-stone-500 mb-2 lg:mb-6">{t('pancaMarga')}</h4>
                  <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-2 lg:gap-y-4 gap-x-2 text-stone-800 text-sm lg:text-lg">
                    <li className="flex gap-2 lg:gap-4 items-center">
                      <div className="w-3 lg:w-6 h-[1px] bg-stone-400 shrink-0" />
                      <span className="leading-tight">{t('pm1')}</span>
                    </li>
                    <li className="flex gap-2 lg:gap-4 items-center">
                      <div className="w-3 lg:w-6 h-[1px] bg-stone-400 shrink-0" />
                      <span className="leading-tight">{t('pm2')}</span>
                    </li>
                    <li className="flex gap-2 lg:gap-4 items-center">
                      <div className="w-3 lg:w-6 h-[1px] bg-stone-400 shrink-0" />
                      <span className="leading-tight">{t('pm3')}</span>
                    </li>
                    <li className="flex gap-2 lg:gap-4 items-center">
                      <div className="w-3 lg:w-6 h-[1px] bg-stone-400 shrink-0" />
                      <span className="leading-tight">{t('pm4')}</span>
                    </li>
                    <li className="flex gap-2 lg:gap-4 items-center">
                      <div className="w-3 lg:w-6 h-[1px] bg-stone-400 shrink-0" />
                      <span className="leading-tight">{t('pm5')}</span>
                    </li>
                  </ul>
                </motion.div>
                
                <div className="w-8 lg:w-16 h-[1px] bg-brand-700" />

                <motion.div 
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
                  className="relative"
                >
                  <h4 className="font-display font-bold uppercase tracking-widest text-xs lg:text-sm text-stone-500 mb-1 lg:mb-4">{t('mosque')}</h4>
                  <p className="text-stone-800 text-xs lg:text-lg leading-snug lg:leading-relaxed">{t('mosqueText')}</p>
                </motion.div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 06: 1996 ({t('state6Name')}) */}
        {currentState === 6 && (
          <SceneWrapper key="state-6">
            <div className="w-full h-full flex flex-col justify-start lg:justify-center pl-6 pr-16 lg:pl-32 lg:pr-[140px] pt-16 lg:pt-0 pb-[25vh] lg:pb-32">
              <div className="max-w-3xl ml-0 lg:ml-auto text-left lg:text-right">
                <div className="font-display font-black text-4xl lg:text-6xl tracking-tighter text-brand-700 mb-2">1996 — 2014</div>
                <h2 className="font-display font-black text-4xl lg:text-7xl uppercase text-stone-900 mb-4 lg:mb-6">Sugiyarto</h2>
                
                <p className="text-base lg:text-lg leading-relaxed text-stone-700 lg:pl-12 mb-6 lg:mb-8">
                  {t('state6Text')}
                </p>
                
                <div className="flex justify-start lg:justify-end gap-12 lg:pl-12 mt-4 lg:mt-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className="font-display font-black text-4xl lg:text-6xl text-stone-900">{t('state6Metric')}</div>
                    <div className="font-bold tracking-widest text-xs lg:text-sm text-stone-500 uppercase mt-2">{t('state6MetricLabel')}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 07: 2014 Transition */}
        {currentState === 7 && (
          <SceneWrapper key="state-7">
            <div className="w-full h-full flex items-center justify-center px-4 pb-[25vh] lg:pb-0">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-24 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-1 lg:space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-2 lg:mb-4 text-xs lg:text-base">2014</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">{t('state7Name1')}</h2>
                  <p className="text-stone-500 italic text-xs lg:text-base">{t('state7Role1')}</p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-16 h-[1px] lg:w-[1px] lg:h-32 bg-stone-300" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-1 lg:space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-2 lg:mb-4 text-xs lg:text-base">2015 — 2018</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">{t('state7Name2')}</h2>
                  <p className="text-stone-500 italic text-xs lg:text-base">{t('state7Role1')}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-16 h-[1px] lg:w-[1px] lg:h-32 bg-stone-300" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="space-y-1 lg:space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-2 lg:mb-4 text-xs lg:text-base">2018 — 2020</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">{t('state7Name3')}</h2>
                  <p className="text-stone-500 italic text-xs lg:text-base">{t('state7Role3')}</p>
                </motion.div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 08: 2021 ({t('state8Name')}) */}
        {currentState === 8 && (
          <SceneWrapper key="state-8">
            <div className="w-full h-full flex items-center pl-6 pr-16 lg:pl-24 lg:pr-[140px] bg-stone-100 pb-[25vh] lg:pb-0">
              <div className="max-w-2xl">
                <div className="font-display font-black text-4xl lg:text-6xl tracking-tighter text-brand-700 mb-2 lg:mb-4">2021</div>
                <h2 className="font-display font-black text-4xl lg:text-7xl uppercase text-stone-900 mb-2 lg:mb-4">Latip Wahyudi</h2>
                <h3 className="font-display text-xl lg:text-2xl font-bold uppercase tracking-widest text-stone-500 mb-4 lg:mb-8">{t('state8Role')}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-stone-700">
                  {t('state8Text')}
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 09: PRESENT DAY (Outro) */}
        {currentState === 9 && (
          <SceneWrapper key="state-9">
            <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 pb-[15vh] lg:pb-[25vh] bg-stone-900 text-white relative overflow-hidden">
              <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-[url('https://picsum.photos/seed/grogolnow/1920/1080')] bg-cover bg-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
              
              <div className="relative z-10 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
                  className="font-display font-black text-[20vw] lg:text-[15rem] tracking-tighter leading-none text-brand-500 mb-4"
                >
                  {t('outro100')}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
                  className="font-display font-bold text-2xl lg:text-4xl tracking-[0.3em] uppercase text-stone-300 mb-12"
                >
                  Tahun
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
                  className="italic text-2xl lg:text-3xl text-stone-300 mb-8"
                >
                  {t('outroQuote')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }}
                  className="text-lg text-white/80 max-w-xl mx-auto"
                >
                  {t('outroText')}
                </motion.p>
              </div>
            </div>
          </SceneWrapper>
        )}

      </AnimatePresence>
    </div>
  );
}

// Reusable wrapper for smooth fade/slide transitions between scenes
function SceneWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full pt-20"
    >
      {children}
    </motion.div>
  );
}
