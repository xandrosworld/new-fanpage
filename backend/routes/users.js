const router = require('express').Router();
const c    = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/',                      c.getAll);
router.get('/:username',             c.getByUsername);
router.patch('/:id',          auth,  c.update);
router.post('/:id/follow',    auth,  c.follow);
router.get('/:id/resources',         c.getUserResources);
router.get('/:id/posts',             c.getUserPosts);
router.get('/:id/reels',             c.getUserReels);

module.exports = router;
