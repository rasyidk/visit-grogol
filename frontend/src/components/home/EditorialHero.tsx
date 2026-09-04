'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const img = (s: string, w = 1200, h = 1600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export function EditorialHero({ isEn }: { isEn: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallaxMedium = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] w-full bg-[#fbfbf8] overflow-hidden pt-32 pb-32 font-sans text-stone-900 border-b border-black/5">
      <div className="container-wide mx-auto px-6 sm:px-12">
        
        {/* ROW 1: Typography + Small Image */}
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-start z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8rem] xl:text-[9.5rem] leading-[0.85] font-black tracking-tighter uppercase text-stone-900">
                <span className="block text-xl sm:text-3xl lg:text-4xl font-bold lowercase tracking-normal mb-2 text-stone-500">
                  {isEn ? 'welcome to' : 'selamat datang di'}
                </span>
                Grogol
              </h1>
            </motion.div>
          </div>

          <motion.div 
            style={{ y: yParallaxSlow }}
            className="col-span-6 sm:col-span-4 col-start-7 sm:col-start-9 lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0"
          >
            <RevealImage src="/Landscape.jpg" alt="Landscape" caption={isEn ? "01 — Landscape" : "01 — Lanskap"} />
          </motion.div>
        </div>

        {/* ROW 1.5: Intro Text */}
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <div className="col-span-12 lg:col-span-5 lg:col-start-2 z-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl leading-relaxed text-stone-700"
            >
              {isEn 
                ? "Tucked away in Gunungkidul, Yogyakarta, Grogol is a village where life unfolds in its own rhythm—where nature, culture, and everyday life come together, and where people turn simplicity into strength."
                : "Terletak di Gunungkidul, Yogyakarta, Grogol adalah sebuah desa tempat kehidupan berjalan dengan ritmenya sendiri—tempat alam, budaya, dan keseharian masyarakat berpadu, serta tempat masyarakat mengubah kesederhanaan menjadi kekuatan."
              }
            </motion.p>
          </div>
        </div>

        {/* ROW 2: Large Image + Text Block */}
        <div className="grid grid-cols-12 gap-6 mt-20 sm:mt-24 lg:mt-32 items-center">
          <div className="col-span-12 sm:col-span-8 lg:col-span-6 z-10">
            <RevealImage src="/People.jpg" alt="People" caption={isEn ? "02 — People" : "02 — Masyarakat"} priority />
          </div>

          <div className="col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-8 mt-12 lg:mt-0">
            <motion.div 
              style={{ y: yParallaxMedium }}
              className="space-y-6 text-stone-700 text-lg sm:text-xl leading-relaxed"
            >
              <p>{isEn ? "Grogol is still growing. Infrastructure continues to develop, facilities continue to improve, and new opportunities are being created for the community. But one thing has never waited for development to grow, the spirit of its people." : "Grogol terus tumbuh. Infrastruktur terus dikembangkan, fasilitas terus dibenahi, dan berbagai peluang baru terus diciptakan bagi masyarakat. Namun, ada satu hal yang tidak pernah menunggu pembangunan untuk tumbuh, semangat masyarakatnya."}</p>
              <p>{isEn ? "In the midst of a simple village life, the people of Grogol find strength in togetherness, perseverance, gratitude, and the ability to find happiness in the things that surround them every day." : "Di tengah kehidupan desa yang sederhana, masyarakat Grogol menemukan kekuatan dalam kebersamaan, ketekunan, rasa syukur, serta kemampuan untuk menemukan kebahagiaan dari hal-hal yang hadir di sekitar mereka setiap hari."}</p>
            </motion.div>
          </div>
        </div>

        {/* ROW 3: Text Block + Medium Image */}
        <div className="grid grid-cols-12 gap-6 mt-24 sm:mt-32 lg:mt-48 items-center">
          <div className="col-span-12 lg:col-span-4 lg:col-start-2 order-last lg:order-first mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-stone-900 mb-6">{isEn ? "This is Grogol." : "Inilah Grogol."}</h3>
              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">{isEn ? "A place where you can experience village life as it truly is. Walk through its landscapes. Discover its culture. Meet its people. Learn from local farmers. Taste its food. Listen to its stories." : "Tempat di mana Anda dapat mengalami kehidupan desa apa adanya. Menyusuri lanskap pedesaan. Mengenal budayanya. Bertemu masyarakatnya. Belajar dari para petani. Mencicipi makanan lokal. Mendengarkan cerita-cerita mereka."}</p>
              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">{isEn ? "And, even for a moment, become part of everyday life in Grogol." : "Dan, walau hanya sesaat, menjadi bagian dari keseharian masyarakat Grogol."}</p>
              <p className="text-brand-800 font-medium text-xl mt-4">{isEn ? "Because here, a journey is not simply about seeing a place. It is about experiencing life." : "Karena di sini, perjalanan bukan sekadar tentang melihat sebuah tempat. Melainkan tentang mengalami kehidupan."}</p>
            </motion.div>
          </div>

          <motion.div 
            style={{ y: yParallaxFast }}
            className="col-span-10 sm:col-span-8 lg:col-span-5 lg:col-start-7 z-0"
          >
            <RevealImage src="/EverydayLife.jpg" alt="Everyday Life" caption={isEn ? "03 — Everyday Life" : "03 — Keseharian"} />
          </motion.div>
        </div>

        {/* ROW 4: Kaloka Intro + Food Image + Culture Image */}
        <div className="grid grid-cols-12 gap-6 mt-24 sm:mt-32 lg:mt-48 items-center">
          <div className="col-span-6 lg:col-span-3">
             <motion.div style={{ y: yParallaxSlow }}>
               <RevealImage src="/Food.jpg" alt="Food" caption={isEn ? "04 — Food" : "04 — Kuliner"} aspect="aspect-square" />
             </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-5 text-center pt-8 pb-4 lg:py-24 z-10 order-first lg:order-none">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-stone-900 leading-[1.05] mb-8"
            >
              <span className="font-display font-black uppercase text-brand-800">Kaloka</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-stone-700 text-lg sm:text-xl text-left leading-relaxed"
            >
              <p>{isEn ? "Kaloka means renowned, distinguished, and widely known." : "Kaloka berarti terkemuka, dikenal, dan tersohor."}</p>
              <p>{isEn ? "For Grogol, Kaloka is more than a name. It is a hope and a direction—an aspiration for Grogol to be known not because it is perfect, but because of the life, people, culture, nature, and experiences that make it uniquely its own." : "Bagi Grogol, Kaloka bukan sekadar sebuah nama. Ia adalah harapan dan arah—sebuah cita-cita agar Grogol semakin dikenal bukan karena kesempurnaannya, tetapi karena kehidupan, masyarakat, budaya, alam, dan pengalaman yang menjadikannya istimewa."}</p>
              <p>{isEn ? "We believe a place does not become meaningful because it is perfect. It becomes meaningful when the people who live there keep moving forward, support one another, and continue to find reasons to be grateful and happy." : "Kami percaya, sebuah tempat tidak menjadi berarti karena ia sempurna. Sebuah tempat menjadi berarti ketika orang-orang yang hidup di dalamnya terus melangkah maju, saling menguatkan, dan terus menemukan alasan untuk bersyukur dan bahagia."}</p>
            </motion.div>
          </div>

          <div className="col-span-6 lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0">
            <motion.div style={{ y: yParallaxMedium }}>
               <RevealImage src="/Culture.jpg" alt="Culture" caption={isEn ? "05 — Culture" : "05 — Budaya"} />
            </motion.div>
          </div>
        </div>

        {/* ROW 5: Outro */}
        <div className="mt-24 sm:mt-32 pb-16 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
              {isEn ? "Come and know Grogol." : "Mari mengenal Grogol."}
            </h3>
            <p className="italic text-stone-500 text-lg sm:text-xl mb-10 font-medium">
              {isEn ? "Come to see. Come to learn. Come to experience. Come to connect." : "Datang untuk melihat. Datang untuk belajar. Datang untuk mengalami. Datang untuk terhubung."}
            </p>
            <p className="font-display font-black text-4xl sm:text-5xl text-stone-900 tracking-tight uppercase">
              Grogol <span className="text-brand-800 font-light mx-2">—</span> <span className="text-brand-800">Kaloka.</span>
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function RevealImage({ src, alt, caption, aspect = "aspect-[3/4]", priority = false }: { src: string, alt: string, caption: string, aspect?: string, priority?: boolean }) {
  return (
    <div className="group relative w-full flex flex-col">
      <motion.div 
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full overflow-hidden bg-stone-200 ${aspect}`}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          priority={priority}
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 flex items-center justify-between text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.2em] text-stone-500"
      >
        <span>{caption}</span>
      </motion.div>
    </div>
  );
}
