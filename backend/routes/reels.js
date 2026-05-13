const router = require('express').Router();
const c    = require('../controllers/reelController');
const auth = require('../middlewares/authMiddleware');

router.get('/',             c.getAll);
router.get('/:id',          c.getOne);
router.post('/',      auth, c.create);
router.post('/:id/view',       auth, c.view);
router.post('/:id/like',       auth, c.like);
router.post('/:id/save',       auth, c.save);
router.post('/:id/share',      auth, c.share);

module.exports = router;
