const router = require('express').Router();
const c    = require('../controllers/resourceController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateRequest');

router.get('/',                        c.getAll);
router.get('/:id',                     c.getOne);
router.post('/',          auth, validate(['title']), c.create);
router.patch('/:id',      auth,        c.update);
router.delete('/:id',     auth,        c.remove);
router.post('/:id/download', auth,     c.download);
router.post('/:id/like',     auth,     c.like);
router.post('/:id/save',     auth,     c.save);

module.exports = router;
