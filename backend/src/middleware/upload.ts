import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Request } from 'express';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

const UPLOAD_ROOT = path.resolve(process.cwd(), env.upload.dir);

// Ensure the upload directory exists at boot.
fs.mkdirSync(path.join(UPLOAD_ROOT, 'images'), { recursive: true });
fs.mkdirSync(path.join(UPLOAD_ROOT, 'videos'), { recursive: true });

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

const storage = multer.diskStorage({
  destination(_req, file, cb) {
    const sub = file.mimetype.startsWith('video/') ? 'videos' : 'images';
    cb(null, path.join(UPLOAD_ROOT, sub));
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .slice(0, 40);
    const unique = `${base}-${process.hrtime.bigint().toString(36)}${ext}`;
    cb(null, unique);
  },
});

function fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest(`Unsupported file type: ${file.mimetype}`));
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.upload.maxFileSizeMb * 1024 * 1024 },
});

/** Build the public URL for a stored file. */
export function fileToPublicUrl(file: Express.Multer.File): string {
  const sub = file.mimetype.startsWith('video/') ? 'videos' : 'images';
  return `${env.upload.publicBaseUrl}/${env.upload.dir}/${sub}/${file.filename}`;
}
