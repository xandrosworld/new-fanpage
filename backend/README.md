# MXH Resource Hub — Backend API

Nền tảng chia sẻ mã nguồn, tài nguyên mạng xã hội, blog, cộng đồng, chat, reels video, nhiệm vụ kiếm tiền và ví rút tiền.

## Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MySQL 8.0 + mysql2/promise (connection pool)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Upload:** Multer (local storage)
- **Realtime:** Socket.io skeleton
- **Tools:** dotenv, cors, nodemon

## Folder Structure
```
backend/
├── config/db.js              # MySQL connection pool
├── controllers/              # Business logic (12 controllers)
├── routes/                   # Express routers (12 route files)
├── middlewares/              # auth, admin, errorHandler, validateRequest
├── utils/                    # response, pagination, slugify helpers
├── uploads/                  # Local file storage
├── schema.sql                # Full MySQL schema (21 tables)
├── seed.sql                  # Sample data (tiếng Việt)
├── server.js                 # Entry point
├── .env.example
└── README.md
```

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create MySQL database
```sql
CREATE DATABASE mxh_resource_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Import schema
```bash
mysql -u root -p mxh_resource_hub < schema.sql
```

### 4. Import seed data
```bash
mysql -u root -p mxh_resource_hub < seed.sql
```

### 5. Configure environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

### 6. Start development server
```bash
npm run dev
# Server runs at http://localhost:5000
```

## API Base URL
```
http://localhost:5000/api
```

## Main API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET    | /api/health | - | Health check |
| POST   | /api/auth/register | - | Đăng ký |
| POST   | /api/auth/login | - | Đăng nhập |
| GET    | /api/auth/me | ✅ | Thông tin user hiện tại |
| GET    | /api/resources | - | Danh sách tài nguyên |
| POST   | /api/resources | ✅ | Đăng tài nguyên mới |
| POST   | /api/resources/:id/download | ✅ | Tải xuống |
| GET    | /api/blogs | - | Danh sách blog |
| GET    | /api/posts | - | Feed cộng đồng |
| GET    | /api/reels | - | Danh sách reels |
| GET    | /api/tasks | - | Danh sách nhiệm vụ |
| POST   | /api/tasks/:id/submit | ✅ | Nộp minh chứng |
| GET    | /api/wallet | ✅ | Thông tin ví |
| POST   | /api/wallet/withdraw | ✅ | Yêu cầu rút tiền |
| GET    | /api/admin/dashboard | ✅ Admin | Tổng quan admin |
| PATCH  | /api/admin/task-submissions/:id/approve | ✅ Admin | Duyệt bài nộp |
| PATCH  | /api/admin/withdraw-requests/:id/status | ✅ Admin | Xử lý yêu cầu rút tiền |

## Seed Accounts

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@mxhhub.vn | Password123! | admin |
| sangnguyen | sang@mxhhub.vn | Password123! | admin |
| minhdev | minh@mxhhub.vn | Password123! | creator |
| linhcreator | linh@mxhhub.vn | Password123! | creator |

## Business Logic Notes

- **Task reward:** Chỉ được cộng tiền sau khi admin duyệt (`/api/admin/task-submissions/:id/approve`)
- **Withdraw:** Kiểm tra balance >= 100.000đ. Khi tạo request, amount chuyển sang `pending_balance`. Admin approve thì deduct `balance` và clear `pending_balance`.
- **Toggle like/save:** Gọi lại endpoint sẽ un-like/un-save
- **Upload:** Lưu local trong thư mục `uploads/`, serve qua `/uploads/filename`
- **Socket.io:** Skeleton sẵn — client join `conv_{id}` và emit `sendMessage`

## Notes
> Frontend demo hiện đang dùng mock data (Next.js). Backend này là API/MySQL skeleton để nối thật ở phase sau.

## Future Improvements
- [ ] Auth đầy đủ (email verify, refresh token, OAuth)
- [ ] Upload lên cloud (AWS S3, Cloudflare R2)
- [ ] Realtime chat Socket.io hoàn chỉnh
- [ ] Payment/withdraw tích hợp thật (MoMo, ZaloPay API)
- [ ] Admin RBAC nâng cao (phân quyền module)
- [ ] Notification system (in-app + email)
- [ ] Rate limiting & security hardening
- [ ] Unit/integration tests
