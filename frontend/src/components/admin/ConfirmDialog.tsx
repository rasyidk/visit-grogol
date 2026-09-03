'use client';

import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '@/components/ui/Button';

export function ConfirmDialog({
  open,
  title = 'Hapus data ini?',
  message = 'Tindakan ini tidak dapat dibatalkan.',
  confirmLabel = 'Ya, Hapus',
  loading = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="md">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <p className="pt-1 text-sm leading-relaxed text-ink-soft">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} type="button" className="text-ink-soft hover:bg-black/5 hover:text-ink">
          Batal
        </Button>
        <Button
          type="button"
          loading={loading}
          onClick={onConfirm}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
