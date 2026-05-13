const router  = require('express').Router();
const { upload, uploadFile } = require('../controllers/uploadController');
const auth    = require('../middlewares/authMiddleware');

// POST /api/uploads/image
router.post('/image', auth, upload.single('file'), uploadFile);
// POST /api/uploads/video
router.post('/video', auth, upload.single('file'), uploadFile);
// POST /api/uploads/file
router.post('/file',  auth, upload.single('file'), uploadFile);

module.exports = router;
