require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const http     = require('http');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);

// ─── Socket.io Skeleton ─────────────────────────────────────
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET', 'POST'] }
});
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('joinConversation', (conversationId) => {
    socket.join(`conv_${conversationId}`);
  });

  socket.on('sendMessage', ({ conversationId, message }) => {
    io.to(`conv_${conversationId}`).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected:', socket.id);
  });
});

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// ─── Health Check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'MXH Resource Hub API is running', timestamp: new Date().toISOString() });
});

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/users',     require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/blogs',     require('./routes/blogs'));
app.use('/api/posts',     require('./routes/posts'));
app.use('/api/comments',  require('./routes/comments'));
app.use('/api/chats',     require('./routes/chats'));
app.use('/api/reels',     require('./routes/reels'));
app.use('/api/tasks',     require('./routes/tasks'));
app.use('/api/wallet',    require('./routes/wallet'));
app.use('/api/admin',     require('./routes/admin'));
app.use('/api/uploads',   require('./routes/uploads'));

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ─── Global Error Handler ────────────────────────────────────
app.use(require('./middlewares/errorHandler'));

// ─── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 MXH Resource Hub API running on http://localhost:${PORT}`);
  console.log(`📖 Health: http://localhost:${PORT}/api/health`);
});

module.exports = { app, server };
