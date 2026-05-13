const router = require('express').Router();
const c    = require('../controllers/commentController');
const auth = require('../middlewares/authMiddleware');

router.get('/',           c.getComments);
router.post('/',    auth, c.createComment);
router.delete('/:id', auth, c.deleteComment);

module.exports = router;
