'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function JejakWaktu() {
  const container = useRef<HTMLDivElement>(null);
  const svgPath = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!svgPath.current) return;
    
    // Animate the main timeline path
    const pathLength = svgPath.current.getTotalLength();
    gsap.set(svgPath.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    ScrollTrigger.create({
      trigger: container.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      animation: gsap.to(svgPath.current, { strokeDashoffset: 0, ease: 'none' }),
    });

    // Node reveals
    const nodes = gsap.utils.toArray('.history-node') as HTMLElement[];
    nodes.forEach((node) => {
      gsap.fromTo(node, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full bg-cream text-stone-900 font-sans overflow-hidden">
      
      {/* 
        ====================================================
        THE SVG PATH (JEJAK WAKTU)
        ====================================================
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block opacity-40">
        <svg 
          className="w-full h-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 10000" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* A long, meandering path from top to bottom */}
          <path
            ref={svgPath}
            d="M 500 0 C 500 200, 300 300, 300 500 C 300 800, 700 1000, 700 1500 C 700 2000, 400 2500, 400 3000 C 400 3500, 600 4000, 600 4500 C 600 5000, 300 5500, 300 6000 C 300 6500, 800 7000, 800 7500 C 800 8000, 400 8500, 400 9000 C 400 9500, 500 9800, 500 10000"
            stroke="currentColor"
            className="text-stone-400"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 
        ====================================================
        HERO SECTION
        ====================================================
      */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/vintage-history/1920/1080')] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none" />
        
        <h1 className="font-display font-black text-[12vw] sm:text-[8vw] lg:text-[7rem] tracking-tighter leading-[0.85] uppercase mb-8">
          Jejak <br />
          <span className="text-stone-500">Sejarah Grogol</span>
        </h1>
        <p className="text-xl sm:text-2xl font-serif italic text-stone-600 max-w-2xl">
          “Sebuah desa tidak hanya dibentuk oleh waktu, tetapi oleh orang-orang yang menjaganya.”
        </p>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="font-display font-bold text-lg tracking-widest text-brand-800 mb-4">
            17 MEI 1916
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-stone-400">
            Scroll Untuk Menelusuri
          </div>
          <div className="w-[1px] h-12 bg-stone-300 mt-4" />
        </div>
      </section>

      {/* 
        ====================================================
        CHAPTERS
        ====================================================
      */}
      
      <div className="relative z-10 container-wide py-32 space-y-[40vh]">

        {/* 1916 - AWAL PERJALANAN */}
        <section className="history-node flex justify-start lg:ml-[15%]">
          <div className="max-w-xl">
            <h2 className="font-display font-black text-6xl lg:text-8xl tracking-tighter text-stone-300 mb-4">1916</h2>
            <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-stone-900 mb-6">Awal Perjalanan</h3>
            <p className="text-lg leading-relaxed text-stone-700">
              Tercatat sebagai tahun lahirnya Kalurahan Grogol. Dalam konteks Kasultanan Ngayogyakarta Hadiningrat, sejarah administrasi desa mulai dibentuk secara sistematis berdasarkan Rijksblad No. 12 Tahun 1916.
            </p>
          </div>
        </section>

        {/* 1927 - GROGOL TERCATAT */}
        <section className="history-node flex justify-end lg:mr-[10%]">
          <div className="max-w-xl text-right">
            <h2 className="font-display font-black text-6xl lg:text-8xl tracking-tighter text-stone-300 mb-4">1927</h2>
            <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-stone-900 mb-6">Grogol Tercatat</h3>
            <div className="bg-[#f4f1ea] border border-stone-200 p-8 rounded-sm shadow-sm inline-block text-left">
              <p className="font-serif italic text-stone-600 mb-4 text-center">Rijksblad van Jogjakarta No. 10 Tahun 1927</p>
              <p className="text-lg leading-relaxed text-stone-800">
                Grogol resmi tercatat sebagai salah satu dari 14 kalurahan di Onder-distrik Paliyan. Struktur pemerintahan desa mulai memiliki landasan administratif yang jelas, mengokohkan peran Grogol di wilayah tersebut.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 
        ====================================================
        CATATAN YANG HILANG (DARK TRANSITION)
        ====================================================
      */}
      <section className="relative z-10 w-full bg-stone-900 text-stone-300 py-48 px-4 flex justify-center items-center text-center">
        <div className="max-w-3xl history-node">
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tighter text-white mb-8">
            Tidak Semua Cerita <br className="hidden sm:block" /> Tercatat.
          </h2>
          <p className="text-xl leading-relaxed text-stone-400 font-serif italic mb-12">
            Beberapa arsip awal pemerintahan hilang tertelan api saat kebakaran melanda kediaman yang juga berfungsi sebagai kantor Lurah Arjo Sukarso.
          </p>
          <p className="text-lg text-stone-300 leading-relaxed max-w-xl mx-auto">
            Namun sejarah tidak pernah benar-benar lenyap. Ia bertahan melalui ingatan para sesepuh, diwariskan dari mulut ke mulut, dan hidup dalam semangat masyarakatnya.
          </p>
        </div>
      </section>

      {/* 
        ====================================================
        THE 8 LEADERS (MILESTONES)
        ====================================================
      */}
      <div className="relative z-10 container-wide py-32 space-y-[30vh]">

        {/* Lurah 1 & 2 */}
        <section className="history-node flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <div className="flex-1 text-center lg:text-right">
            <h4 className="text-sm font-bold tracking-[0.2em] text-brand-700 mb-2 uppercase">Masa Awal</h4>
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tighter text-stone-900 mb-2">Tokaryo</h2>
            <p className="text-stone-500 italic font-serif">Lurah Pertama</p>
          </div>
          <div className="hidden lg:block w-[1px] h-32 bg-stone-300" />
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-sm font-bold tracking-[0.2em] text-brand-700 mb-2 uppercase">Penerus</h4>
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tighter text-stone-900 mb-2">Karyo Dikromo</h2>
            <p className="text-stone-500 italic font-serif">Lurah Kedua</p>
          </div>
        </section>

        {/* Lurah 3 & 4 */}
        <section className="history-node flex justify-center text-center">
          <div className="max-w-lg">
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tighter text-stone-900 mb-2">Arjo Sukarso</h2>
            <p className="text-stone-500 italic font-serif mb-8">Lurah Ketiga (Masa Kebakaran Arsip)</p>
            
            <div className="w-[1px] h-24 bg-stone-300 mx-auto my-8" />
            
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tighter text-stone-900 mb-2">Sastro Diwirjo</h2>
            <p className="text-stone-500 italic font-serif">Lurah Keempat</p>
          </div>
        </section>

        {/* 1965-1996 - Hadi Suwarno */}
        <section className="history-node relative py-24 border-y border-stone-200">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="font-display font-black text-[15vw] lg:text-[12rem] tracking-tighter leading-[0.8] text-stone-200 mb-4">1965</div>
              <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-stone-900 mb-4">Hadi Suwarno</h2>
              <h3 className="font-display text-2xl font-bold tracking-widest text-brand-700 mb-8">31 TAHUN KEPEMIMPINAN</h3>
              <p className="text-lg leading-relaxed text-stone-700 max-w-md mx-auto lg:mx-0">
                Periode penting dalam sejarah pembangunan fisik Grogol. Melalui program Panca Marga, infrastruktur desa berkembang pesat.
              </p>
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="p-8 bg-white shadow-card border border-stone-100 rounded-sm">
                <h4 className="font-bold text-xl mb-4 text-stone-900">Panca Marga (1983)</h4>
                <ul className="list-none space-y-3">
                  <li className="flex gap-3"><span className="text-brand-600 font-bold">—</span> <span className="text-stone-600">Jalan Lingkar Desa</span></li>
                  <li className="flex gap-3"><span className="text-brand-600 font-bold">—</span> <span className="text-stone-600">Tugu Batas Wilayah</span></li>
                  <li className="flex gap-3"><span className="text-brand-600 font-bold">—</span> <span className="text-stone-600">Irigasi Bulak Lungguh Grogol</span></li>
                  <li className="flex gap-3"><span className="text-brand-600 font-bold">—</span> <span className="text-stone-600">Poskamling Terpadu</span></li>
                  <li className="flex gap-3"><span className="text-brand-600 font-bold">—</span> <span className="text-stone-600">Balai Kalurahan Baru</span></li>
                </ul>
              </div>
              <div className="p-8 bg-[#f4f1ea] border border-stone-200 rounded-sm">
                <h4 className="font-bold text-xl mb-2 text-stone-900">Masjid Ki Ageng Pemanahan</h4>
                <p className="text-stone-600">Berdiri megah sebagai salah satu ikon spiritual dan pusat kegiatan masyarakat Grogol hingga hari ini.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 1996-2014 - Sugiyarto */}
        <section className="history-node flex justify-end lg:mr-[10%]">
          <div className="max-w-2xl text-right">
            <div className="font-display font-black text-4xl lg:text-6xl tracking-tighter text-stone-400 mb-4">1996 — 2014</div>
            <h2 className="font-display font-black text-6xl lg:text-8xl uppercase text-stone-900 mb-12">Sugiyarto</h2>
            
            <div className="flex justify-end gap-12 mb-8">
              <div>
                <div className="font-display font-black text-5xl lg:text-6xl text-brand-700">6,25</div>
                <div className="font-bold tracking-widest text-stone-500 uppercase mt-2">KM Jalan Desa</div>
              </div>
              <div>
                <div className="font-display font-black text-5xl lg:text-6xl text-brand-700">100%</div>
                <div className="font-bold tracking-widest text-stone-500 uppercase mt-2">Akses Air</div>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed text-stone-700">
              Fokus pada peningkatan jalan pertanian, revitalisasi Pasar Karangmojo A, pembangunan embung tadah hujan, serta penguatan kegiatan sosial, keagamaan, dan kesenian warga.
            </p>
          </div>
        </section>

        {/* 2014-2021 Transition */}
        <section className="history-node flex justify-center">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="text-stone-400 font-bold tracking-widest uppercase">2014 — 2021</div>
            
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl lg:text-4xl text-stone-800">Ngadiyono</h2>
              <p className="text-stone-500 italic font-serif">Lurah Ketujuh</p>
            </div>
            
            <div className="w-[1px] h-12 bg-stone-300" />
            
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl lg:text-4xl text-stone-800">H. Suhari</h2>
              <p className="text-stone-500 italic font-serif">Pj. Lurah</p>
            </div>

            <div className="w-[1px] h-12 bg-stone-300" />
            
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl lg:text-4xl text-stone-800">Drs. Purnomo</h2>
              <p className="text-stone-500 italic font-serif">Pj. Lurah</p>
            </div>
          </div>
        </section>

        {/* 2021 - Latip Wahyudi */}
        <section className="history-node flex justify-start lg:ml-[15%]">
          <div className="max-w-xl">
            <div className="font-display font-black text-6xl lg:text-8xl tracking-tighter text-brand-700 mb-4">2021</div>
            <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-stone-900 mb-6">Latip Wahyudi</h2>
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-stone-500 mb-6">Lurah Kedelapan</h3>
            <p className="text-lg leading-relaxed text-stone-700">
              Membawa visi modernisasi tanpa meninggalkan akar tradisi. Di bawah kepemimpinannya, Grogol bertransformasi menjadi desa wisata unggulan—Kaloka—yang dikenal luas karena keindahan alam dan kearifan lokalnya.
            </p>
          </div>
        </section>

      </div>

      {/* 
        ====================================================
        PRESENT DAY (OUTRO)
        ====================================================
      */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center text-center mt-32 z-10 overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/grogolnow/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl px-4 history-node">
          <p className="font-serif italic text-2xl lg:text-4xl text-stone-400 mb-8">
            “Sejarah Grogol bukan sesuatu yang telah selesai.”
          </p>
          <div className="font-display font-black text-[20vw] lg:text-[15rem] tracking-tighter leading-none text-brand-500 mb-8">
            100+
          </div>
          <div className="font-display font-bold text-2xl lg:text-4xl tracking-[0.3em] uppercase text-stone-300 mb-4">
            TAHUN
          </div>
          <p className="text-xl lg:text-2xl font-serif italic text-white/80 mt-8">
            Dan ceritanya masih berlanjut.
          </p>
        </div>
      </section>

    </div>
  );
}
