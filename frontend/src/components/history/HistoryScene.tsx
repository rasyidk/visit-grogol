'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface HistorySceneProps {
  currentState: number;
}

export function HistoryScene({ currentState }: HistorySceneProps) {
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
                Jejak <br />
                <span className="text-brand-700">Sejarah Grogol</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl sm:text-2xl italic text-stone-600 max-w-2xl"
              >
                “Sebuah desa tidak hanya dibentuk oleh waktu, tetapi oleh orang-orang yang menjaganya.”
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute top-[15vh] lg:top-[20vh] font-display font-bold text-xl tracking-[0.5em] text-brand-800"
              >
                17 MEI 1916
              </motion.div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 01: 1916 */}
        {currentState === 1 && (
          <SceneWrapper key="state-1">
            <div className="w-full h-full flex items-center px-6 lg:px-24">
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                  className="font-display font-black text-[15vw] lg:text-[12rem] tracking-tighter leading-none text-brand-800 opacity-[0.15] mb-4"
                >
                  1916
                </motion.div>
                
                <h3 className="font-display text-2xl lg:text-4xl font-bold uppercase tracking-widest text-stone-900 mb-6">Awal Perjalanan</h3>
                <p className="text-lg lg:text-xl leading-relaxed text-stone-700">
                  Tercatat sebagai tahun lahirnya Kalurahan Grogol. Dalam konteks Kasultanan Ngayogyakarta Hadiningrat, sejarah administrasi desa mulai dibentuk secara sistematis berdasarkan Rijksblad No. 12 Tahun 1916.
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 02: 1927 */}
        {currentState === 2 && (
          <SceneWrapper key="state-2">
            <div className="w-full h-full flex items-center justify-end px-6 lg:px-32">
              <div className="max-w-2xl text-right">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                  className="font-display font-black text-7xl lg:text-9xl tracking-tighter text-brand-800 opacity-[0.15] mb-6"
                >
                  1927
                </motion.div>
                
                <div className="inline-block text-left max-w-lg mt-8">
                  <div className="w-16 h-[1px] bg-brand-700 mb-8" />
                  <h3 className="font-display text-xl lg:text-2xl font-bold uppercase tracking-widest text-stone-900 mb-2">Rijksblad van Jogjakarta No. 10</h3>
                  <p className="italic text-stone-500 mb-6">Tahun 1927</p>
                  <p className="text-lg leading-relaxed text-stone-800">
                    Grogol resmi tercatat sebagai salah satu dari 14 kalurahan di Onder-distrik Paliyan. Struktur pemerintahan desa mulai memiliki landasan administratif yang jelas.
                  </p>
                </div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 03: 1946 (Arjo Sukarso & Catatan Hilang) */}
        {currentState === 3 && (
          <SceneWrapper key="state-3">
            <div className="w-full h-full flex items-center justify-center px-4 bg-stone-900 text-stone-200">
              <div className="max-w-4xl text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                  className="text-stone-500 font-display text-3xl mb-8"
                >
                  1946
                </motion.div>
                <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-white mb-6">Arjo Sukarso</h2>
                <p className="text-xl lg:text-2xl italic text-stone-400 mb-12">Lurah Ketiga</p>
                
                <div className="w-16 h-[1px] bg-stone-700 mx-auto mb-12" />
                
                <p className="text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">
                  Masa transisi dari era kolonial menuju awal kemerdekaan. Pada periode ini pula, tragedi kebakaran menelan arsip-arsip awal pemerintahan Grogol. Namun sejarah tetap hidup melalui ingatan warga.
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 04: 1947 */}
        {currentState === 4 && (
          <SceneWrapper key="state-4">
            <div className="w-full h-full flex items-center px-6 lg:px-32">
              <div className="max-w-xl">
                <div className="font-display font-black text-6xl tracking-tighter text-brand-700 mb-4">1947 — 1965</div>
                <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-stone-900 mb-6">Sastro Diwirjo</h2>
                <p className="text-lg leading-relaxed text-stone-700">
                  Memimpin Kalurahan Grogol melintasi masa-masa genting awal kemerdekaan hingga pertengahan tahun 60-an, menjaga stabilitas dan semangat kebersamaan masyarakat desa.
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 05: 1965 (Hadi Suwarno) */}
        {currentState === 5 && (
          <SceneWrapper key="state-5">
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 pt-24 pb-32">
              <div className="flex-1 lg:pr-12 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display font-black text-[12vw] lg:text-[10rem] tracking-tighter leading-[0.8] text-brand-800 opacity-[0.15] mb-4"
                >
                  1965
                </motion.div>
                <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-stone-900 mb-4">Hadi Suwarno</h2>
                <h3 className="font-display text-2xl font-bold tracking-widest text-brand-700 mb-6">31 TAHUN</h3>
                <p className="text-lg leading-relaxed text-stone-700 max-w-md">
                  Periode krusial dalam sejarah pembangunan fisik Grogol. Infrastruktur desa berkembang secara terpadu melalui semangat gotong royong.
                </p>
              </div>
              
              <div className="flex-1 w-full mt-12 lg:mt-0 space-y-12 pl-0 lg:pl-12 border-l-0 lg:border-l border-stone-300">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm text-stone-500 mb-6">Panca Marga (1983)</h4>
                  <ul className="list-none space-y-4 text-stone-800 text-lg">
                    <li className="flex gap-4 items-center">
                      <div className="w-6 h-[1px] bg-stone-400" />
                      <span>Jalan Lingkar Desa</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-6 h-[1px] bg-stone-400" />
                      <span>Tugu Batas Wilayah</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-6 h-[1px] bg-stone-400" />
                      <span>Irigasi Bulak Lungguh</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-6 h-[1px] bg-stone-400" />
                      <span>Poskamling Terpadu</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <div className="w-6 h-[1px] bg-stone-400" />
                      <span>Balai Kalurahan Baru</span>
                    </li>
                  </ul>
                </motion.div>
                
                <div className="w-16 h-[1px] bg-brand-700" />

                <motion.div 
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
                  className="relative"
                >
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm text-stone-500 mb-4">Masjid Ki Ageng Pemanahan</h4>
                  <p className="text-stone-800 text-lg leading-relaxed">Dibangun megah sebagai salah satu ikon spiritual Grogol hingga hari ini.</p>
                </motion.div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 06: 1996 (Sugiyarto) */}
        {currentState === 6 && (
          <SceneWrapper key="state-6">
            <div className="w-full h-full flex flex-col justify-center px-6 lg:px-32">
              <div className="max-w-3xl ml-auto text-right">
                <div className="font-display font-black text-5xl lg:text-7xl tracking-tighter text-brand-700 mb-2">1996 — 2014</div>
                <h2 className="font-display font-black text-6xl lg:text-8xl uppercase text-stone-900 mb-12">Sugiyarto</h2>
                
                <div className="flex justify-end gap-12 mb-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <div className="font-display font-black text-6xl lg:text-7xl text-brand-700">6,25</div>
                    <div className="font-bold tracking-widest text-stone-500 uppercase mt-2">KM Jalan Desa</div>
                  </motion.div>
                </div>
                
                <p className="text-lg leading-relaxed text-stone-700 lg:pl-24">
                  Peningkatan masif pada jalan lingkungan dan jalan usaha tani. Revitalisasi Pasar Karangmojo A, pembangunan embung tadah hujan, dan penguatan seni budaya menjadi ciri khas kepemimpinan ini.
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 07: 2014 Transition */}
        {currentState === 7 && (
          <SceneWrapper key="state-7">
            <div className="w-full h-full flex items-center justify-center px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-4">2014</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">Ngadiyono</h2>
                  <p className="text-stone-500 italic">Pj. Lurah</p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="hidden lg:block w-[1px] h-32 bg-stone-300" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-4">2015 — 2018</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">H. Suhari</h2>
                  <p className="text-stone-500 italic">Pj. Lurah</p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="hidden lg:block w-[1px] h-32 bg-stone-300" />
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="space-y-2">
                  <div className="text-stone-400 font-bold tracking-widest uppercase mb-4">2018 — 2020</div>
                  <h2 className="font-display font-black text-3xl lg:text-5xl text-stone-800">Drs. Purnomo</h2>
                  <p className="text-stone-500 italic">Pj. Lurah</p>
                </motion.div>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 08: 2021 (Latip Wahyudi) */}
        {currentState === 8 && (
          <SceneWrapper key="state-8">
            <div className="w-full h-full flex items-center px-6 lg:px-24 bg-stone-100">
              <div className="max-w-2xl">
                <div className="font-display font-black text-6xl lg:text-8xl tracking-tighter text-brand-700 mb-4">2021</div>
                <h2 className="font-display font-black text-5xl lg:text-7xl uppercase text-stone-900 mb-4">Latip Wahyudi</h2>
                <h3 className="font-display text-xl font-bold uppercase tracking-widest text-stone-500 mb-8">Lurah Kedelapan</h3>
                <p className="text-lg lg:text-xl leading-relaxed text-stone-700">
                  Membawa visi modernisasi tanpa meninggalkan akar tradisi. Di era ini, Grogol bertransformasi menjadi desa wisata unggulan—Kaloka—yang dikenal luas karena inovasi, keindahan alam, dan kearifan lokalnya.
                </p>
              </div>
            </div>
          </SceneWrapper>
        )}

        {/* STATE 09: PRESENT DAY (Outro) */}
        {currentState === 9 && (
          <SceneWrapper key="state-9">
            <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 bg-stone-900 text-white relative overflow-hidden">
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
                  100+
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
                  “Sejarah Grogol bukan sesuatu yang telah selesai.”
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }}
                  className="text-lg text-white/80 max-w-xl mx-auto"
                >
                  Dan ketika Anda datang ke Grogol hari ini, Anda sedang menginjak tanah yang menyimpan lebih dari satu abad cerita.
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
