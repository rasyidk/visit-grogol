'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createOne, getApiErrorMessage } from '@/lib/api';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  variant?: 'light' | 'green';
  title?: string;
  description?: string;
  cta?: string;
}

export function Newsletter({
  variant = 'light',
  title = 'Rencanakan Akhir Pekan Anda Bersama Kami',
  description = 'Dapatkan panduan eksklusif dan penawaran khusus untuk penginapan villa terbaik langsung di email Anda.',
  cta = 'Berlangganan',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const green = variant === 'green';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await createOne('/newsletter', { email });
      toast.success('Berhasil berlangganan! Terima kasih.');
      setEmail('');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Gagal berlangganan'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'rounded-4xl px-6 py-14 text-center sm:px-16',
        green ? 'bg-brand-gradient text-white shadow-soft' : 'bg-sand'
      )}
    >
      <h2 className={cn('mx-auto max-w-xl text-2xl font-bold sm:text-3xl', green ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      <p className={cn('mx-auto mt-4 max-w-lg text-sm sm:text-base', green ? 'text-white/80' : 'text-ink-muted')}>
        {description}
      </p>
      <form onSubmit={submit} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Alamat email Anda"
          aria-label="Alamat email"
          className={cn(
            'flex-1 rounded-full px-6 py-3.5 text-sm outline-none transition',
            green
              ? 'bg-white/90 text-ink placeholder:text-ink-muted/70 focus:ring-2 focus:ring-white'
              : 'bg-white text-ink shadow-card placeholder:text-ink-muted/70 focus:ring-2 focus:ring-brand-500/30'
          )}
        />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'btn shrink-0 disabled:opacity-70',
            green ? 'bg-white text-brand-700 hover:bg-brand-50' : 'btn-primary'
          )}
        >
          {loading ? 'Memproses…' : cta}
        </button>
      </form>
    </div>
  );
}
