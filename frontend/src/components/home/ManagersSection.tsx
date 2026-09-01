'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Reveal } from '@/components/ui/Reveal';

interface Manager {
  name: string;
  role: string;
  seed: string;
}

interface ManagersSectionProps {
  isEn: boolean;
  team: Manager[];
}

const img = (s: string, w = 400, h = 400) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export function ManagersSection({ isEn, team }: ManagersSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Organic asynchronous levitation/floating motion for each avatar
      avatarRefs.current.forEach((el, index) => {
        if (!el) return;

        gsap.to(el, {
          y: -10,
          rotation: index % 2 === 0 ? 2 : -2,
          duration: 2.4 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });

        // 2. Interactive Magnetic cursor attraction on mouse move
        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
          const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;

          gsap.to(el, {
            x,
            y,
            scale: 1.08,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
          });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [team]);

  return (
    <section ref={containerRef} className="py-24 container-wide">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            {isEn ? 'Meet Our Managers' : 'Bertemu dengan Pengelola Kami'}
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-5xl mx-auto">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <div className="group text-center flex flex-col items-center cursor-pointer">
              <div
                ref={(el) => {
                  avatarRefs.current[i] = el;
                }}
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full p-1 bg-gradient-to-tr from-brand-300 via-white to-gold-300 shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white">
                  <Image
                    src={img(m.seed, 300, 300)}
                    alt={m.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="150px"
                  />
                </div>
              </div>
              <p className="mt-4 font-bold text-ink text-sm sm:text-base group-hover:text-brand-700 transition-colors">
                {m.name}
              </p>
              <p className="text-xs font-semibold text-brand-600 mt-0.5">{m.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
