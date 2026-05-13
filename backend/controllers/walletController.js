const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/wallet — summary + transactions
const getWallet = async (req, res) => {
  try {
    const [[user]] = await db.query(
      'SELECT balance, pending_balance FROM users WHERE id=?', [req.user.id]
    );
    const [[earned]] = await db.query(
      'SELECT COALESCE(SUM(amount),0) AS total FROM wallet_transactions WHERE user_id=? AND type="task_reward" AND status="success"',
      [req.user.id]
    );
    const [[withdrawn]] = await db.query(
      'SELECT COALESCE(SUM(ABS(amount)),0) AS total FROM wallet_transactions WHERE user_id=? AND type="withdraw" AND status="success"',
      [req.user.id]
    );
    const [transactions] = await db.query(
      'SELECT * FROM wallet_transactions WHERE user_id=? ORDER BY created_at DESC LIMIT 20', [req.user.id]
    );
    return R.success(res, {
      balance:         user.balance,
      pending_balance: user.pending_balance,
      total_earned:    earned.total,
      total_withdrawn: withdrawn.total,
      transactions,
    });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/wallet/transactions
const getTransactions = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  try {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM wallet_transactions WHERE user_id=?', [req.user.id]);
    const [rows] = await db.query(
      'SELECT * FROM wallet_transactions WHERE user_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [req.user.id, limit, offset]
    );
    return R.success(res, { transactions: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/wallet/withdraw
const withdraw = async (req, res) => {
  const { amount, method, account_name, account_number, bank_name, note } = req.body;
  const amt = parseFloat(amount);
  if (!amt || amt < 100000) return R.badRequest(res, 'Số tiền rút tối thiểu là 100.000đ');
  if (!method || !account_name || !account_number) return R.badRequest(res, 'Thiếu thông tin tài khoản nhận tiền');

  try {
    const [[user]] = await db.query('SELECT balance FROM users WHERE id=?', [req.user.id]);
    if (amt > user.balance) return R.badRequest(res, 'Số dư không đủ để thực hiện rút tiền');

    const refCode = 'WD-' + Date.now();

    // Create withdraw request
    await db.query(
      'INSERT INTO withdraw_requests (user_id, amount, method, account_name, account_number, bank_name, note) VALUES (?,?,?,?,?,?,?)',
      [req.user.id, amt, method, account_name, account_number, bank_name || null, note || null]
    );

    // Create pending wallet transaction
    await db.query(
      'INSERT INTO wallet_transactions (user_id, type, amount, status, reference_code, note) VALUES (?,?,?,?,?,?)',
      [req.user.id, 'withdraw', -amt, 'pending', refCode, `Yêu cầu rút tiền qua ${method}`]
    );

    // Move balance to pending
    // NOTE: We move the amount to pending_balance, not deduct from balance yet.
    // Admin will finalize balance deduction when approving.
    await db.query(
      'UPDATE users SET pending_balance = pending_balance + ? WHERE id=?', [amt, req.user.id]
    );

    return R.created(res, { reference_code: refCode }, 'Yêu cầu rút tiền đã được gửi, admin sẽ xử lý trong 24–48h');
  } catch (err) { return R.error(res, 'Gửi yêu cầu rút tiền thất bại', 500, err); }
};

module.exports = { getWallet, getTransactions, withdraw };
