'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Film } from 'lucide-react';
import { toast } from 'sonner';
import { uploadFile, getApiErrorMessage } from '@/lib/api';

export function MediaUpload({
  value,
  onChange,
  accept = 'image',
  label,
}: {
  value?: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video';
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFile = async (file?: File) => {
    if (!file) return;
    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      onChange(url);
      setPreview(url);
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Upload gagal'));
      setPreview(value);
    } finally {
      setUploading(false);
    }
  };

  const clear = () => {
    setPreview(undefined);
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const isVideo = accept === 'video';

  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <input
        ref={inputRef}
        type="file"
        accept={isVideo ? 'video/*' : 'image/*'}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-black/10">
          {isVideo ? (
            <video src={preview} className="h-44 w-full bg-black object-contain" controls />
          ) : (
            <div className="relative h-44 w-full">
              <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-red-600 shadow hover:bg-white"
            aria-label="Hapus media"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/15 bg-black/[0.02] text-ink-muted transition hover:border-brand-400 hover:bg-brand-50/40"
        >
          {uploading ? (
            <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
          ) : isVideo ? (
            <Film className="h-7 w-7" />
          ) : (
            <UploadCloud className="h-7 w-7" />
          )}
          <span className="text-sm font-medium">Klik untuk mengunggah {isVideo ? 'video' : 'gambar'}</span>
          <span className="text-xs">atau tempel URL di bawah</span>
        </button>
      )}

      {/* Manual URL fallback */}
      <input
        type="text"
        value={preview && preview.startsWith('http') ? preview : ''}
        onChange={(e) => {
          setPreview(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="https://…"
        className="field-input mt-2 text-xs"
      />
    </div>
  );
}
