const router = require('express').Router();
const { register, login, me } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateRequest');

router.post('/register', validate(['name','username','email','password']), register);
router.post('/login',    validate(['email','password']), login);
router.get('/me',        auth, me);

module.exports = router;
