'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBeritaDetail, useBerita } from '@/hooks/usePublicData';
import { useLocale } from 'next-intl';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Spinner } from '@/components/ui/Misc';
import { Reveal } from '@/components/ui/Reveal';

export default function KabarGrogolDetailPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: article, isLoading } = useBeritaDetail(params.slug);
  const { data: latestArticles } = useBerita({ limit: 4 });

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 min-h-screen text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-ink">
          {isEn ? 'Article Not Found' : 'Artikel Tidak Ditemukan'}
        </h1>
        <Link href="/kabar-grogol" className="mt-6 btn-primary">
          {isEn ? 'Back to News' : 'Kembali ke Kabar Grogol'}
        </Link>
      </div>
    );
  }

  const displayTitle = isEn ? (article.title_en || article.title) : article.title;
  const displayContent = isEn ? (article.content_en || article.content) : article.content;

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      {/* Article Header */}
      <div className="container-wide pt-8 pb-12">
        <Link 
          href="/kabar-grogol" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEn ? 'Back to News' : 'Kembali ke Kabar Grogol'}
        </Link>

        <Reveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight mb-8">
            {displayTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-ink-soft border-y border-black/10 py-4 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-soft/70">
                  {isEn ? 'Written by' : 'Ditulis oleh'}
                </p>
                <p className="font-semibold text-ink">{article.author || 'Admin'}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-black/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-soft/70">
                  {isEn ? 'Published on' : 'Diterbitkan pada'}
                </p>
                <p className="font-semibold text-ink">
                  {formatDate(article.published_at || article.created_at, locale)}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Featured Image */}
      {article.thumbnail && (
        <Reveal>
          <div className="container-wide mb-16">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg border border-black/5">
              <Image 
                src={article.thumbnail} 
                alt={displayTitle} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </div>
        </Reveal>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div 
            className="prose prose-lg md:prose-xl prose-brand max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600 prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: displayContent || '' }}
          />
        </Reveal>
      </div>

      {/* Recommended Articles Section */}
      {latestArticles && latestArticles.length > 1 && (
        <div className="container-wide mt-32 border-t border-black/10 pt-16">
          <h2 className="text-2xl font-bold text-ink mb-8">
            {isEn ? 'Latest Stories' : 'Cerita Terbaru Lainnya'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles
              .filter((p) => p.id !== article.id)
              .slice(0, 3)
              .map((post) => (
                <Link key={post.id} href={`/kabar-grogol/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-black/5">
                    {post.thumbnail && (
                      <Image 
                        src={post.thumbnail} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-ink group-hover:text-brand-600 transition-colors line-clamp-2 leading-tight">
                    {isEn ? (post.title_en || post.title) : post.title}
                  </h3>
                </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
