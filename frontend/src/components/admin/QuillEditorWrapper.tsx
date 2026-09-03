'use client';

import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/api';

if (typeof window !== 'undefined') {
  (window as any).Quill = Quill;
  try {
    const ImageResize = require('quill-image-resize-module-react').default || require('quill-image-resize-module-react');
    Quill.register('modules/imageResize', ImageResize);
  } catch (e) {
    console.error('Failed to register imageResize module', e);
  }

  // Register explicit pixel sizes
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = ['5px', '8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px', '100px'];
  Quill.register(Size, true);
}

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditorWrapper({ value, onChange }: QuillEditorProps) {
  const quillRef = useRef<any>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }, { 'size': ['5px', '8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px', '100px'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: function (this: any) {
          const quill = this.quill;
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.style.display = 'none';
          document.body.appendChild(input);

          input.onchange = async () => {
            const file = input.files?.[0];
            document.body.removeChild(input);
            if (!file) return;

            let range = quill.getSelection(true);
            if (!range) {
              range = { index: quill.getLength(), length: 0 };
            }

            toast.loading('Mengunggah gambar...', { id: 'uploading' });
            try {
              const { url } = await uploadFile(file);
              quill.insertEmbed(range.index, 'image', url);
              quill.setSelection(range.index + 1);
              toast.success('Gambar berhasil ditambahkan', { id: 'uploading' });
            } catch (err: any) {
              toast.error(err?.message || 'Gagal mengunggah gambar ke dalam editor', { id: 'uploading' });
            }
          };
          
          input.click();
        }
      }
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  }), []);


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value]::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value]::before {
          content: attr(data-value) !important;
        }
      `}} />
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={value || ''} 
        onChange={onChange} 
        modules={modules} 
      />
    </>
  );
}
