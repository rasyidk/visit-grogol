'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useKisahKami } from '@/hooks/usePublicData';

export function KehidupanMasyarakat() {
  const { data: htmlContent, isLoading } = useKisahKami();
  const t = useTranslations('KehidupanMasyarakat');

  return (
    <>
    <section className="bg-cream w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 text-stone-800">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Dynamic Content Section */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          {isLoading ? (
             <div className="animate-pulse space-y-4">
                <div className="h-4 bg-stone-300 rounded w-3/4"></div>
                <div className="h-4 bg-stone-300 rounded w-full"></div>
                <div className="h-4 bg-stone-300 rounded w-5/6"></div>
             </div>
          ) : htmlContent ? (
            <div
              className="prose prose-stone prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-5xl prose-h1:md:text-7xl prose-h1:text-stone-900 prose-h2:text-3xl prose-h2:text-brand-700"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="prose prose-stone prose-lg md:prose-xl max-w-none">
              <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter text-stone-900 uppercase">
                {t('title')}
              </h1>
              <p className="font-display text-xl md:text-2xl italic text-stone-500">
                {t('subtitle')}
              </p>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
            </div>
          )}
        </div>

      </div>
    </section>

    {/* The Invitation Section (Kept for visual impact) */}
    <section className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/grogol-sunset/1920/1080')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-12"
      >
        <p className="text-brand-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {t('p18')}
        </p>
        
        <h2 className="font-display font-light text-4xl md:text-5xl lg:text-7xl text-cream leading-[1.2] tracking-wide max-w-4xl mx-auto">
          {t('p19')}
        </h2>
        
        <div className="pt-12">
          <a href="/id/reservasi" className="group inline-flex items-center justify-center gap-2 md:gap-4 px-6 md:px-10 py-3 md:py-5 bg-white text-stone-950 rounded-full font-bold uppercase tracking-widest md:tracking-[0.2em] text-[10px] md:text-sm hover:bg-brand-500 hover:text-white transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(22,101,52,0.3)]">
            Rencanakan Kunjungan
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </motion.div>
    </section>
    </>
  );
}
