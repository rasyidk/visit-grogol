'use client';

import { useMemo, useRef } from 'react';
import { useForm, Controller, type DefaultValues } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { MediaUpload, GalleryUpload } from './MediaUpload';
import { fetchList, uploadFile } from '@/lib/api';
import type { FieldConfig, ResourceConfig, SelectOption } from './resourceTypes';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('./QuillEditorWrapper'), { ssr: false, loading: () => <div className="h-[242px] animate-pulse bg-black/5 rounded-lg border border-black/10" /> });

type Values = Record<string, unknown>;

function getExistingValue(record: Values | undefined, key: string): unknown {
  if (!record) return undefined;
  if (record[key] !== undefined && record[key] !== null) return record[key];

  // camelCase -> snake_case (e.g., contentEn -> content_en, isActive -> is_active)
  const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  if (record[snakeKey] !== undefined && record[snakeKey] !== null) return record[snakeKey];

  // snake_case -> camelCase (e.g., content_en -> contentEn, is_active -> isActive)
  const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  if (record[camelKey] !== undefined && record[camelKey] !== null) return record[camelKey];

  return undefined;
}

/** Build initial form values from an existing record or field defaults. */
function buildDefaults(fields: FieldConfig[], record?: Values): Values {
  const out: Values = {};
  for (const f of fields) {
    const existing = getExistingValue(record, f.name);
    if (existing !== undefined && existing !== null) {
      if (f.type === 'tags' && Array.isArray(existing)) out[f.name] = existing.join(', ');
      else if (f.type === 'checkbox_group' && Array.isArray(existing)) {
        out[f.name] = existing.map(String).map(s => s.toLowerCase());
      }
      else if (f.type === 'date' && typeof existing === 'string') out[f.name] = existing.slice(0, 10);
      else out[f.name] = existing;
    } else {
      out[f.name] =
        f.defaultValue ?? (f.type === 'switch' ? false : f.type === 'number' ? 0 : f.type === 'checkbox_group' ? [] : '');
    }
  }
  return out;
}

/** Normalise values before submit (tags → array, numbers, empty → undefined). */
function normalise(fields: FieldConfig[], values: Values): Values {
  const out: Values = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === 'tags') {
      out[f.name] = typeof v === 'string' && v.trim()
        ? v.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
    } else if (f.type === 'number') {
      out[f.name] = v === '' || v === null ? undefined : Number(v);
    } else if (f.type === 'switch') {
      out[f.name] = Boolean(v);
    } else if (v === '') {
      out[f.name] = undefined;
    } else {
      out[f.name] = v;
    }
  }
  return out;
}

function DynamicSelect({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const { data } = useQuery({
    queryKey: ['options', field.optionsEndpoint],
    queryFn: () => fetchList<Record<string, unknown>>(field.optionsEndpoint!, { limit: 100 }),
    enabled: !!field.optionsEndpoint,
  });

  const options: SelectOption[] =
    field.options ??
    (data?.data ?? []).map((r) => ({
      value: r.id as number,
      label: String(r[field.optionLabelKey ?? 'name']),
    }));

  return (
    <select
      id={field.name}
      className="field-input appearance-none"
      value={value === undefined || value === null ? '' : String(value)}
      onChange={(e) => onChange(field.type === 'select' && !Number.isNaN(Number(e.target.value)) && e.target.value !== '' ? Number(e.target.value) : e.target.value)}
    >
      <option value="">Pilih…</option>
      {options.map((o) => (
        <option key={String(o.value)} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ResourceForm({
  config,
  record,
  submitting,
  onSubmit,
  onCancel,
}: {
  config: ResourceConfig;
  record?: Values;
  submitting?: boolean;
  onSubmit: (values: Values) => Promise<void> | void;
  onCancel: () => void;
}) {
  const defaults = useMemo(() => buildDefaults(config.fields, record), [config.fields, record]);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues: defaults as DefaultValues<Values> });

  const submit = async (values: Values) => {
    try {
      await onSubmit(normalise(config.fields, values));
    } catch (err: any) {
      if (err.response?.status === 422 && err.response.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, { type: 'server', message: serverErrors[key][0] });
        });
      } else {
        toast.error('Terjadi kesalahan saat menyimpan data.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {config.fields.map((field) => {
          const err = errors[field.name]?.message as string | undefined;
          const span = field.colSpan === 1 ? 'sm:col-span-1' : 'sm:col-span-2';
          return (
            <div key={field.name} className={cn(field.type === 'switch' ? 'sm:col-span-2' : span)}>
              {field.type !== 'switch' && field.type !== 'image' && field.type !== 'video' && field.type !== 'gallery' && (
                <label className="field-label" htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
              )}

              {(() => {
                switch (field.type) {
                  case 'textarea':
                    return (
                      <textarea
                        id={field.name}
                        rows={4}
                        className="field-input resize-none"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: field.required && `${field.label} wajib diisi` })}
                      />
                    );
                  case 'number':
                    return (
                      <input
                        id={field.name}
                        type="number"
                        min={field.min}
                        max={field.max}
                        className="field-input"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: field.required && `${field.label} wajib diisi` })}
                      />
                    );
                  case 'date':
                    return <input id={field.name} type="date" className="field-input" {...register(field.name)} />;
                  case 'tags':
                    return (
                      <input
                        id={field.name}
                        className="field-input"
                        placeholder={field.placeholder ?? 'pisahkan dengan koma'}
                        {...register(field.name)}
                      />
                    );
                  case 'checkbox_group':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        render={({ field: f }) => {
                          const valueArr = Array.isArray(f.value) ? f.value : [];
                          return (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.options?.map((opt) => (
                                <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer bg-gray-800/50 border border-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors">
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-600 bg-gray-900 text-neon-teal focus:ring-neon-teal focus:ring-offset-gray-900 cursor-pointer h-4 w-4"
                                    checked={valueArr.includes(opt.value as never)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        f.onChange([...valueArr, opt.value]);
                                      } else {
                                        f.onChange(valueArr.filter((v: unknown) => v !== opt.value));
                                      }
                                    }}
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }}
                      />
                    );
                  case 'switch':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        render={({ field: f }) => (
                          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-black/10 px-4 py-3">
                            <span className="text-sm font-medium text-ink-soft">{field.label}</span>
                            <button
                              type="button"
                              onClick={() => f.onChange(!f.value)}
                              className={cn(
                                'relative h-6 w-11 rounded-full transition',
                                f.value ? 'bg-brand-600' : 'bg-black/15'
                              )}
                            >
                              <span
                                className={cn(
                                  'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all',
                                  f.value ? 'left-[22px]' : 'left-0.5'
                                )}
                              />
                            </button>
                          </label>
                        )}
                      />
                    );
                  case 'select':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        rules={{ required: field.required && `${field.label} wajib dipilih` }}
                        render={({ field: f }) => (
                          <DynamicSelect field={field} value={f.value} onChange={f.onChange} />
                        )}
                      />
                    );
                  case 'image':
                  case 'video':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        rules={{ required: field.required && `${field.label} wajib diunggah` }}
                        render={({ field: f }) => (
                          <MediaUpload
                            label={field.label}
                            accept={field.type === 'video' ? 'video' : 'image'}
                            value={f.value as string}
                            onChange={f.onChange}
                          />
                        )}
                      />
                    );
                  case 'gallery':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        rules={{ required: field.required && `${field.label} wajib diunggah` }}
                        render={({ field: f }) => (
                          <GalleryUpload
                            label={field.label}
                            value={(f.value as string[]) || []}
                            onChange={f.onChange}
                          />
                        )}
                      />
                    );
                  case 'richtext':
                    return (
                      <Controller
                        control={control}
                        name={field.name}
                        rules={{ required: field.required && `${field.label} wajib diisi` }}
                        render={({ field: f }) => (
                          <div className="bg-white [&_.ql-container]:min-h-[200px] [&_.ql-container]:text-base [&_.ql-editor]:min-h-[200px] [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg">
                            <QuillEditor value={(f.value as string) || ''} onChange={f.onChange} />
                          </div>
                        )}
                      />
                    );
                  default:
                    return (
                      <input
                        id={field.name}
                        className="field-input"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: field.required && `${field.label} wajib diisi` })}
                      />
                    );
                }
              })()}

              {field.help && <p className="mt-1 text-xs text-ink-muted">{field.help}</p>}
              {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3 border-t border-black/5 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" loading={submitting}>
          Simpan
        </Button>
      </div>
    </form>
  );
}
