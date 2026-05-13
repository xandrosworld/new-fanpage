const router = require('express').Router();
const c    = require('../controllers/chatController');
const auth = require('../middlewares/authMiddleware');

router.get('/',                                 auth, c.getConversations);
router.post('/',                                auth, c.createConversation);
router.get('/:conversationId/messages',         auth, c.getMessages);
router.post('/:conversationId/messages',        auth, c.sendMessage);

module.exports = router;
