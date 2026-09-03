'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBerita } from '@/hooks/usePublicData';
import { Reveal } from '@/components/ui/Reveal';
import { useLocale } from 'next-intl';
import { Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Spinner } from '@/components/ui/Misc';

export default function KabarGrogolPage() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: beritaList, isLoading } = useBerita({ limit: 12 });

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

  if (!beritaList || beritaList.length === 0) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <h1 className="text-3xl font-bold text-ink">
          {isEn ? 'Grogol News' : 'Kabar Grogol'}
        </h1>
        <p className="mt-4 text-ink-soft">
          {isEn ? 'No news available at the moment.' : 'Belum ada kabar terbaru saat ini.'}
        </p>
      </div>
    );
  }

  const [heroPost, ...gridPosts] = beritaList;

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container-wide">
        
        <Reveal>
          <div className="mb-12 border-b border-black/10 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              {isEn ? 'Grogol News' : 'Kabar Grogol'}
            </h1>
            <p className="mt-4 text-lg text-ink-soft max-w-2xl mx-auto md:mx-0">
              {isEn 
                ? 'Stay updated with the latest stories, announcements, and events from our village.' 
                : 'Ikuti terus cerita terbaru, pengumuman, dan acara dari desa kami.'}
            </p>
          </div>
        </Reveal>

        {/* Hero Post */}
        {heroPost && (
          <Reveal>
            <Link href={`/kabar-grogol/${heroPost.slug}`} className="group relative block overflow-hidden rounded-[2.5rem] bg-black/5 aspect-[4/3] md:aspect-[21/9] mb-12 shadow-sm">
              {heroPost.thumbnail ? (
                <Image 
                  src={heroPost.thumbnail} 
                  alt={heroPost.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority 
                />
              ) : (
                <div className="absolute inset-0 bg-brand-900" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 text-sm font-medium mb-4 text-white/80">
                  <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {formatDate(heroPost.published_at || heroPost.created_at, locale)}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <User className="w-4 h-4" />
                    {heroPost.author || 'Admin'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl drop-shadow-md">
                  {isEn ? (heroPost.title_en || heroPost.title) : heroPost.title}
                </h2>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grid Posts */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <Link href={`/kabar-grogol/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-black/5">
                    {post.thumbnail && (
                      <Image 
                        src={post.thumbnail} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink-soft mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at || post.created_at, locale)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink group-hover:text-brand-600 transition-colors line-clamp-2">
                    {isEn ? (post.title_en || post.title) : post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
