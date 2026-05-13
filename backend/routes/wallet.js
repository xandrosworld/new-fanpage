const router = require('express').Router();
const c    = require('../controllers/walletController');
const auth = require('../middlewares/authMiddleware');

router.get('/',               auth, c.getWallet);
router.get('/transactions',   auth, c.getTransactions);
router.post('/withdraw',      auth, c.withdraw);

module.exports = router;
