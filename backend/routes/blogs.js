const router = require('express').Router();
const c    = require('../controllers/blogController');
const auth = require('../middlewares/authMiddleware');

router.get('/',          c.getAll);
router.get('/:id',       c.getOne);
router.post('/',  auth,  c.create);
router.patch('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);
router.post('/:id/like', auth, c.like);

module.exports = router;
