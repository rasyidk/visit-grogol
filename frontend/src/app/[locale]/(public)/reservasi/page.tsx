'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MessageCircle, Train, Plane, Bike, MapPin, Sun } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { createOne, getApiErrorMessage } from '@/lib/api';
import { useKontak, useProfil } from '@/hooks/usePublicData';
import { useTranslations } from 'next-intl';

const baseSchema = z.object({
  name: z.string(),
  email: z.string(),
  arrivalDate: z.string().optional(),
  guests: z.coerce.number(),
  packageType: z.string().optional(),
  note: z.string().optional(),
});
type FormValues = z.infer<typeof baseSchema>;

export default function KontakPage() {
  const t = useTranslations('Kontak');
  const { data: kontak } = useKontak();
  const { data: profil } = useProfil();

  const schema = z.object({
    name: z.string().min(2, t('errNameMin')),
    email: z.string().email(t('errEmail')),
    arrivalDate: z.string().optional(),
    guests: z.coerce.number().min(1, t('errGuestsMin')).max(500),
    packageType: z.string().optional(),
    note: z.string().optional(),
  });

  const PACKAGES = [t('pkgFull'), t('pkg2Days'), t('pkgCulinary'), t('pkgAdventure')];
  
  const transports = [
    { icon: Train, title: t('transportTrain').split(' + ')[0], desc: t('transportTrain').split(' + ')[1] || 'Naik taksi resmi atau shuttle desa selama 45 menit perjalanan.' },
    { icon: Plane, title: t('transportPlaneTitle'), desc: t('transportPlaneDesc') },
    { icon: Bike, title: t('transportBikeTitle'), desc: t('transportBikeDesc') },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { guests: 1, packageType: PACKAGES[0] } });

  const onSubmit = async (values: FormValues) => {
    try {
      await createOne('/reservasi', values);
      toast.success(t('toastSuccess'));
      reset();
    } catch (err) {
      toast.error(getApiErrorMessage(err, t('toastError')));
    }
  };

  const waLink = `https://wa.me/${(kontak.whatsapp ?? '').replace(/\D/g, '')}`;

  return (
    <>
      <section className="container-wide pt-32 text-center sm:pt-40">
        <Reveal>
          <h1 className="text-4xl font-extrabold text-brand-600 sm:text-5xl">{t('heroTitle')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">
            {t('heroDesc')}
          </p>
        </Reveal>
      </section>

      <section className="container-wide mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <Reveal>
          <form onSubmit={handleSubmit(onSubmit)} className="card p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-ink">{t('formTitle')}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label={t('labelName')} error={errors.name?.message}>
                <input className="field-input" placeholder={t('phName')} {...register('name')} />
              </Field>
              <Field label={t('labelEmail')} error={errors.email?.message}>
                <input className="field-input" placeholder={t('phEmail')} {...register('email')} />
              </Field>
              <Field label={t('labelDate')}>
                <input type="date" className="field-input" {...register('arrivalDate')} />
              </Field>
              <Field label={t('labelGuests')} error={errors.guests?.message}>
                <input type="number" min={1} className="field-input" placeholder="0" {...register('guests')} />
              </Field>
              <div className="sm:col-span-2">
                <Field label={t('labelPackage')}>
                  <select className="field-input" {...register('packageType')}>
                    {PACKAGES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t('labelMessage')}>
                  <textarea rows={4} className="field-input resize-none" placeholder={t('phMessage')} {...register('note')} />
                </Field>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full">
              {isSubmitting ? t('btnSending') : t('btnSubmit')}
            </button>
          </form>
        </Reveal>

        {/* Side panels */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
              <h3 className="text-xl font-bold">{t('supportTitle')}</h3>
              <p className="mt-3 text-sm text-white/80">
                {t('supportDesc')}
              </p>
              <a href={waLink} target="_blank" rel="noreferrer" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                <MessageCircle className="h-4 w-4" /> {t('supportWaBtn')}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl bg-white shadow-card">
              <div className="relative h-44">
                <Image src="https://picsum.photos/seed/desa-map/600/400" alt="Peta desa" fill className="object-cover" />
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="glass-strong absolute bottom-3 right-3 rounded-full px-4 py-2 text-xs font-semibold text-ink">
                  {t('mapViewBtn')}
                </a>
                <div className="glass-strong absolute left-3 top-3 rounded-full p-2 text-brand-600"><MapPin className="h-4 w-4" /></div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-strong rounded-3xl p-6">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Bike className="h-4 w-4" /> {t('guideTransport')}
              </p>
              <ul className="space-y-4">
                {transports.map((t) => (
                  <li key={t.title} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                      <t.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.title}</p>
                      <p className="text-xs leading-relaxed text-ink-muted">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banner */}
      <section className="section container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl">
            <div className="relative h-[380px]">
              <Image src={profil?.kontakHeroImage || 'https://picsum.photos/seed/sunrise-hills/1600/800'} alt="Ketenangan menanti" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white sm:p-14">
              <h2 className="max-w-md text-3xl font-bold sm:text-4xl">{t('bannerTitle')}</h2>
              <p className="mt-3 max-w-sm text-sm text-white/80">
                {t('bannerDesc')}
              </p>
            </div>
            <div className="glass-strong absolute bottom-6 right-6 rounded-2xl px-6 py-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">{t('weatherForecast')}</p>
              <p className="mt-1 flex items-center gap-2 text-2xl font-bold text-ink">
                <Sun className="h-6 w-6 text-gold-500" /> 28°C
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
