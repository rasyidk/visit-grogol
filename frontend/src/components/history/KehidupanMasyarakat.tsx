'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function KehidupanMasyarakat() {
  const t = useTranslations('KehidupanMasyarakat');

  return (
    <>
    <section className="bg-cream w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 text-stone-800">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-5xl md:text-7xl tracking-tighter text-stone-900 uppercase"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-xl md:text-2xl italic text-stone-500"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Content Section 1 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
        </div>

        {/* Content Section 2 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-700">{t('h1')}</h2>
          <p>{t('p3')}</p>
          <p>{t('p4')}</p>
        </div>

        {/* Content Section 3 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-700">{t('h2')}</h2>
          <p>{t('p5')}</p>
          <p>{t('p6')}</p>
        </div>

        {/* Content Section 4 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-700">{t('h3')}</h2>
          <p>{t('p7')}</p>
          <p>{t('p8')}</p>
          <p>{t('p9')}</p>
        </div>

        {/* Content Section 5 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-700">{t('h4')}</h2>
          <p>{t('p10')}</p>
          <p>{t('p11')}</p>
        </div>

        {/* Content Section 6 */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-700">{t('h5')}</h2>
          <p>{t('p12')}</p>
          <p>{t('p13')}</p>
          <p className="font-bold text-brand-800">{t('p14')}</p>
          <p>{t('p15')}</p>
        </div>

        {/* End of main content */}
      </div>
    </section>

    {/* Final Conclusion Section (Premium Split Layout) */}
    <section className="w-full bg-stone-900 text-stone-100 py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Sticky Left Column */}
        <div className="lg:w-1/3 flex flex-col items-start lg:sticky top-32 h-fit">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-5xl md:text-6xl text-white uppercase tracking-tighter leading-[0.9] mb-8"
          >
            {t('h6')}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl text-stone-400 leading-relaxed">{t('p16')}</p>
            <p className="font-display font-bold text-2xl md:text-3xl text-brand-500 leading-snug">{t('p17')}</p>
          </motion.div>
        </div>

        {/* Right Scrolling Column */}
        <div className="lg:w-2/3 flex flex-col pt-12 lg:pt-0">
          <motion.ul 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex flex-col w-full"
          >
            {[t('l1'), t('l2'), t('l3'), t('l4'), t('l5'), t('l6')].map((item, index) => (
              <motion.li 
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="group border-b border-stone-800/60 py-6 md:py-8 flex items-center gap-6 cursor-default"
              >
                <div className="w-6 md:w-8 h-px bg-stone-700 group-hover:bg-brand-500 group-hover:w-12 transition-all duration-300" />
                <div className="text-xl md:text-2xl lg:text-3xl font-light text-stone-300 leading-snug tracking-wide group-hover:text-white transition-colors duration-300">
                  {item}
                </div>
              </motion.li>
            ))}
          </motion.ul>

        </div>
      </div>
    </section>

    {/* The Invitation Section */}
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
