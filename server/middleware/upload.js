import multer from 'multer';

// Memory storage — file stays in RAM just long enough to forward to
// Supabase Storage, never touches disk. Capped at 5MB, images only.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WEBP or GIF images are allowed'));
  }
}

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single('file');