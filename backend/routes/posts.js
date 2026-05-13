const router = require('express').Router();
const c    = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');

router.get('/',             c.getAll);
router.post('/', auth,      c.create);
router.get('/:id',          c.getOne);
router.delete('/:id', auth, c.remove);
router.post('/:id/like',  auth, c.like);
router.post('/:id/share', auth, c.share);

module.exports = router;
