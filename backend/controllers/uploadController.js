const multer = require('multer');
const path   = require('path');
const R      = require('../utils/response');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || 'uploads'),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|mp4|mov|zip|pdf/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  cb(null, allowed.test(ext));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 100 * 1024 * 1024 } });

const uploadFile = (req, res) => {
  if (!req.file) return R.badRequest(res, 'Không có file được tải lên');
  const fileUrl = `/uploads/${req.file.filename}`;
  return R.created(res, { file_url: fileUrl, filename: req.file.filename, size: req.file.size });
};

module.exports = { upload, uploadFile };
