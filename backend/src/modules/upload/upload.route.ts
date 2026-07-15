import { Router, Request, Response } from 'express';
import { upload, fileToPublicUrl } from '../../middleware/upload';
import { authenticate, authorize } from '../../middleware/auth';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendCreated } from '../../utils/apiResponse';
import { ApiError } from '../../utils/ApiError';

const router = Router();
const guard = [authenticate, authorize('ADMIN', 'SUPERADMIN')];

// Single image/video
router.post(
  '/',
  ...guard,
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) throw ApiError.badRequest('No file uploaded (field name must be "file")');
    sendCreated(
      res,
      {
        url: fileToPublicUrl(req.file),
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
      'File uploaded'
    );
  })
);

// Multiple images (max 10)
router.post(
  '/multiple',
  ...guard,
  upload.array('files', 10),
  asyncHandler(async (req: Request, res: Response) => {
    const files = (req.files as Express.Multer.File[]) ?? [];
    if (files.length === 0) throw ApiError.badRequest('No files uploaded (field name must be "files")');
    sendCreated(
      res,
      files.map((f) => ({ url: fileToPublicUrl(f), filename: f.filename, size: f.size })),
      'Files uploaded'
    );
  })
);

export default router;
