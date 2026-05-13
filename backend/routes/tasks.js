const router = require('express').Router();
const c    = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

router.get('/',                    c.getAll);
router.get('/:id',                 c.getOne);
router.post('/:id/start',   auth,  c.start);
router.post('/:id/submit',  auth,  c.submit);

module.exports = router;
