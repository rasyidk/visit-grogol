'use client';

import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MessageCircle, Train, Plane, Bike, Bus, Car, MapPin, Sun } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { createOne, getApiErrorMessage } from '@/lib/api';
import { useKontak, useProfil, useReservasiContent } from '@/hooks/usePublicData';
import { useLocale, useTranslations } from 'next-intl';

const TRANSPORT_ICONS = { train: Train, plane: Plane, bike: Bike, car: Car, bus: Bus };

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
  const locale = useLocale() as 'id' | 'en';
  const { data: kontak } = useKontak();
  const { data: profil } = useProfil();
  const { data: reservationContent } = useReservasiContent();

  const schema = z.object({
    name: z.string().min(2, t('errNameMin')),
    email: z.string().email(t('errEmail')),
    arrivalDate: z.string().optional(),
    guests: z.coerce.number().min(1, t('errGuestsMin')).max(500),
    packageType: z.string().optional(),
    note: z.string().optional(),
  });

  const packageOptions = useMemo(
    () => reservationContent.packages.map((item) => ({
      id: item.id,
      label: item.label[locale] || item.label.id,
    })),
    [locale, reservationContent.packages]
  );

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { guests: 1, packageType: packageOptions[0]?.label } });

  useEffect(() => {
    const currentPackage = getValues('packageType');
    if (packageOptions.length > 0 && !packageOptions.some((item) => item.label === currentPackage)) {
      setValue('packageType', packageOptions[0].label);
    }
  }, [getValues, packageOptions, setValue]);

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
                    {packageOptions.map((item) => (
                      <option key={item.id} value={item.label}>{item.label}</option>
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
                <Image src={reservationContent.map.image || '/Landscape.jpg'} alt={locale === 'en' ? 'Grogol map' : 'Peta desa'} fill className="object-cover" />
                <a href={reservationContent.map.url || '#'} target="_blank" rel="noreferrer" className="glass-strong absolute bottom-3 right-3 rounded-full px-4 py-2 text-xs font-semibold text-ink">
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
                {reservationContent.transport.map((item) => {
                  const Icon = TRANSPORT_ICONS[item.icon] || Bike;
                  const title = item.title[locale] || item.title.id;
                  const description = item.description[locale] || item.description.id;

                  return (
                  <li key={item.id} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{title}</p>
                      <p className="text-xs leading-relaxed text-ink-muted">{description}</p>
                    </div>
                  </li>
                  );
                })}
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
              <Image src={profil?.kontakHeroImage || '/HeroBanner.jpg'} alt="Ketenangan menanti" fill className="object-cover" />
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
