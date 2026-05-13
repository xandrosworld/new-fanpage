const db = require('../config/db');
const R  = require('../utils/response');

// GET /api/chats — conversations for current user
const getConversations = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, 
              (SELECT content FROM messages WHERE conversation_id=c.id ORDER BY created_at DESC LIMIT 1) AS last_message,
              (SELECT created_at FROM messages WHERE conversation_id=c.id ORDER BY created_at DESC LIMIT 1) AS last_message_time
       FROM conversations c
       JOIN conversation_members cm ON cm.conversation_id = c.id
       WHERE cm.user_id = ?
       ORDER BY last_message_time DESC`, [req.user.id]
    );
    return R.success(res, { conversations: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/chats/:conversationId/messages
const getMessages = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, u.name AS sender_name, u.username AS sender_username, u.avatar_url AS sender_avatar
       FROM messages m JOIN users u ON m.sender_id=u.id
       WHERE m.conversation_id=? ORDER BY m.created_at ASC`,
      [req.params.conversationId]
    );
    return R.success(res, { messages: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/chats/:conversationId/messages
const sendMessage = async (req, res) => {
  const { content, message_type } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO messages (conversation_id, sender_id, content, message_type) VALUES (?,?,?,?)',
      [req.params.conversationId, req.user.id, content, message_type || 'text']
    );
    await db.query('UPDATE conversations SET updated_at=NOW() WHERE id=?', [req.params.conversationId]);
    return R.created(res, { id: result.insertId }, 'Đã gửi tin nhắn');
  } catch (err) { return R.error(res, 'Gửi tin nhắn thất bại', 500, err); }
};

// POST /api/chats — create conversation
const createConversation = async (req, res) => {
  const { title, type, member_ids } = req.body;
  try {
    const [result] = await db.query('INSERT INTO conversations (title, type) VALUES (?,?)', [title, type || 'group']);
    const convId = result.insertId;
    const members = [...new Set([req.user.id, ...(member_ids || [])])];
    for (const uid of members) {
      await db.query('INSERT INTO conversation_members (conversation_id, user_id) VALUES (?,?)', [convId, uid]);
    }
    return R.created(res, { id: convId });
  } catch (err) { return R.error(res, 'Tạo cuộc trò chuyện thất bại', 500, err); }
};

module.exports = { getConversations, getMessages, sendMessage, createConversation };
