USE `mxh_resource_hub`;
SET FOREIGN_KEY_CHECKS = 0;

-- Users (password: Password123!)
INSERT INTO `users` (`id`,`name`,`username`,`email`,`password_hash`,`avatar_url`,`role`,`badge`,`balance`,`pending_balance`,`followers_count`,`following_count`,`status`) VALUES
(1,'Sang Nguyễn','sangnguyen','sang@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=1','admin','Admin MXH Hub',5000000.00,0.00,500,50,'active'),
(2,'Minh Dev','minhdev','minh@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=2','creator','Verified Creator',1250000.00,320000.00,1200,150,'active'),
(3,'Linh Creator','linhcreator','linh@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=3','creator','Top Seller',3400000.00,0.00,3400,200,'active'),
(4,'Admin MXH Hub','admin','admin@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=4','admin','Admin',0.00,0.00,10,5,'active'),
(5,'Huy Automation','huyauto','huy@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=5','creator','Node.js Expert',850000.00,0.00,850,40,'active'),
(6,'Thảo UI','thaoui','thao@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=6','user',NULL,125000.00,0.00,430,100,'active'),
(7,'Khoa Node','khonode','khoa@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=7','creator','Verified Creator',2100000.00,0.00,2100,50,'active'),
(8,'Mai Content','maicontent','mai@mxhhub.vn','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lbPC','https://i.pravatar.cc/150?u=8','user',NULL,80000.00,0.00,800,120,'active');

-- Resource Categories
INSERT INTO `resource_categories` (`id`,`name`,`slug`,`description`) VALUES
(1,'Source Code','source-code','Mã nguồn các dự án thực tế'),
(2,'Template Website','template-website','Template giao diện website chuyên nghiệp'),
(3,'Tool MXH','tool-mxh','Công cụ hỗ trợ mạng xã hội'),
(4,'Script Automation','script-automation','Script tự động hóa quy trình'),
(5,'UI Kit','ui-kit','Bộ component giao diện người dùng');

-- Resources
INSERT INTO `resources` (`id`,`user_id`,`category_id`,`title`,`slug`,`description`,`price`,`is_free`,`tech_stack`,`downloads_count`,`rating`,`status`) VALUES
(1,2,1,'Node.js Blog CMS Starter','nodejs-blog-cms-starter','Fullstack blog CMS với Next.js 14 và Node.js Express. Hỗ trợ Markdown và SEO metadata.',0.00,1,'["Node.js","Next.js","MySQL"]',1250,4.8,'published'),
(2,5,4,'Facebook Content Automation Kit','facebook-content-automation-kit','Bộ script Python tự động hóa đăng bài và quản lý content trên Facebook.',250000.00,0,'["Python","Selenium","Facebook API"]',450,4.9,'published'),
(3,3,5,'TikTok Video Scheduler UI','tiktok-video-scheduler-ui','Giao diện React hiện đại cho tool lên lịch video TikTok.',150000.00,0,'["React","TikTok API","Tailwind CSS"]',890,4.7,'published'),
(4,2,2,'Next.js Marketplace Template','nextjs-marketplace-template','Template sàn thương mại điện tử với Stripe tích hợp.',499000.00,0,'["Next.js","Stripe","Prisma"]',210,5.0,'published'),
(5,3,2,'Social Media Analytics Dashboard','social-media-analytics-dashboard','Dashboard thống kê mạng xã hội với Chart.js và Tailwind CSS.',0.00,1,'["React","Chart.js","Tailwind CSS"]',3200,4.6,'published'),
(6,7,5,'Messenger-style Chat UI Kit','messenger-style-chat-ui-kit','Giao diện chat giống Facebook Messenger cho React Native.',199000.00,0,'["React Native","Socket.io"]',540,4.8,'published'),
(7,3,5,'Premium Avatar Frame Pack','premium-avatar-frame-pack','Gói 20+ khung avatar chất lượng cao định dạng PNG và SVG.',50000.00,0,'["SVG","PNG","Design"]',1500,4.9,'published'),
(8,2,2,'Resource Seller Dashboard','resource-seller-dashboard','Trang admin quản lý bán tài nguyên số với Next.js và Prisma.',350000.00,0,'["Next.js","Prisma","PostgreSQL"]',120,4.5,'published'),
(9,5,1,'MySQL Community Backend Starter','mysql-community-backend-starter','Backend API mẫu cho mạng xã hội với Node.js, Express và MySQL.',0.00,1,'["Node.js","Express","MySQL"]',870,4.7,'published'),
(10,3,5,'Creator Profile UI Pack','creator-profile-ui-pack','Trang cá nhân cho Creator tích hợp Link-in-bio.',99000.00,0,'["HTML","CSS","JavaScript"]',630,4.8,'published');

-- Blog Categories
INSERT INTO `blog_categories` (`id`,`name`,`slug`) VALUES
(1,'Node.js','nodejs'),
(2,'React','react'),
(3,'Kiếm tiền online','kiem-tien-online'),
(4,'Social Media Tools','social-media-tools'),
(5,'Case Study','case-study');

-- Blog Posts
INSERT INTO `blog_posts` (`id`,`user_id`,`category_id`,`title`,`slug`,`excerpt`,`reading_time`,`status`,`views_count`) VALUES
(1,2,1,'Cách xây dựng website chia sẻ source code bằng Node.js','cach-xay-dung-website-chia-se-source-code','Hướng dẫn chi tiết A-Z tạo nền tảng chia sẻ source code có tích hợp thanh toán và quản lý user.',8,'published',1520),
(2,3,5,'Tối ưu cộng đồng online cho creator và developer','toi-uu-cong-dong-online','5 chiến lược thực chiến giữ chân user trong nền tảng mạng xã hội mới.',5,'published',980),
(3,3,3,'Vì sao marketplace tài nguyên số đang phát triển mạnh?','vi-sao-marketplace-tai-nguyen-so-phat-trien','Nhu cầu mua bán template, source code đang tăng vọt trong giới freelancer.',6,'published',2100),
(4,7,2,'Hướng dẫn tạo blog tích hợp trong web app Next.js','huong-dan-tao-blog-tich-hop-nextjs','Sử dụng Next.js và MDX để tạo trải nghiệm blog cực nhanh và chuẩn SEO.',10,'published',750),
(5,3,4,'Thiết kế trang cá nhân giống Facebook nhưng có bản sắc riêng','thiet-ke-trang-ca-nhan-giong-facebook','Phân tích UX/UI trang cá nhân và cách áp dụng vào platform của bạn.',7,'published',1340),
(6,5,1,'Tích hợp chat realtime cho cộng đồng bằng Socket.io','tich-hop-chat-realtime-socket-io','Step-by-step setup server Socket.io và connect với React frontend.',12,'published',890),
(7,2,3,'Cách xây dựng hệ thống nhiệm vụ kiếm tiền cho cộng đồng','he-thong-nhiem-vu-kiem-tien','Gamification là chìa khóa. Chia sẻ kinh nghiệm làm task system chống cheat.',9,'published',1650),
(8,2,3,'Thiết kế ví rút tiền an toàn trong nền tảng creator economy','thiet-ke-vi-rut-tien-an-toan','Những lưu ý bảo mật và luồng khi người dùng yêu cầu rút tiền.',8,'published',2200);

-- Community Posts
INSERT INTO `community_posts` (`id`,`user_id`,`content`,`post_type`,`likes_count`,`comments_count`,`shares_count`) VALUES
(1,2,'Mình vừa up bộ template Next.js marketplace, anh em cần có thể tải thử ở mục Tài nguyên nhé. Có hỗ trợ Stripe sẵn luôn! 🚀','text',124,18,5),
(2,5,'Có ai đang làm tool tự động hóa nội dung Facebook không? Mình muốn trao đổi thêm về cách bypass một số check mới của FB API.','text',45,32,2),
(3,7,'Bản update mới của Node.js Blog CMS đã hỗ trợ markdown editor và SEO metadata. Mọi người clone về vọc thử nha.','text',89,12,8),
(4,3,'Share free 20 avatar frame cho creator dùng thử. Link trong bio hoặc tìm trong kho tài nguyên của mình nhé. ✨','text',256,45,30),
(5,8,'Mình vừa hoàn thành nhiệm vụ review tool, được cộng 35.000đ vào ví. Nhiệm vụ nền tảng duyệt nhanh phết! 💰','task_update',112,8,3),
(6,3,'Xu hướng làm Reels hiện tại là tập trung vào giá trị cốt lõi ngay 3s đầu tiên. Đừng dông dài nữa các bác ạ.','text',340,56,45),
(7,2,'Hôm nay mình sẽ live stream hướng dẫn tích hợp Socket.io vào Next.js lúc 8h tối. Anh em nhớ đón xem trên group nhé.','text',178,24,12),
(8,6,'Cho mình hỏi ngu xíu, làm sao để verify tài khoản Creator trên nền tảng này vậy mọi người?','text',12,15,0),
(9,6,'Mới tập tành học React, mong được mọi người chỉ giáo. Mình có nên học Next.js luôn không hay rành React trước?','text',56,42,0),
(10,3,'Giao diện mới của nền tảng nhìn mướt thực sự. Dark mode kết hợp gradient đúng chuẩn premium! 😍','text',450,89,67);

-- Conversations
INSERT INTO `conversations` (`id`,`title`,`type`) VALUES
(1,'Node.js Việt Nam','group'),
(2,'Tool MXH & Automation','group'),
(3,'Chợ Source Code','group'),
(4,'Creator Premium','group'),
(5,'Support MXH Resource Hub','group');

-- Conversation Members
INSERT INTO `conversation_members` (`conversation_id`,`user_id`,`role`) VALUES
(1,1,'admin'),(1,2,'member'),(1,5,'member'),(1,7,'member'),
(2,1,'admin'),(2,5,'member'),(2,3,'member'),
(3,1,'admin'),(3,2,'member'),(3,3,'member'),(3,7,'member'),
(4,1,'admin'),(4,2,'member'),(4,3,'member'),
(5,4,'admin'),(5,2,'member'),(5,6,'member');

-- Messages
INSERT INTO `messages` (`conversation_id`,`sender_id`,`content`,`message_type`) VALUES
(1,2,'Chào mọi người, có ai làm tool FB không?','text'),
(1,5,'Mình đang làm nhé. Bạn cần hỗ trợ phần nào?','text'),
(1,2,'Mình bị lỗi check point khi login qua API.','text'),
(1,5,'Dạo này FB quét mạnh, cậu dùng proxy dân cư xem sao.','text'),
(1,7,'Đúng rồi, mình cũng toàn dùng proxy 5G.','text'),
(2,5,'Anh em ơi, có script auto post group FB không share mình với.','text'),
(2,3,'Mình có nhưng phải update lại do FB thay API.','text'),
(2,1,'Group này share kinh nghiệm tự động hóa MXH nhé mọi người.','text'),
(3,3,'Ai cần source code NodeJS blog liên hệ mình nhé.','text'),
(3,2,'Mình cần template marketplace bán resource, bạn có không?','text'),
(3,7,'Mình up lên kho rồi, anh em vào tải thử đi.','text'),
(4,3,'Chào mừng Creator mới tham gia nhóm Premium!','text'),
(4,2,'Tháng này doanh thu tài nguyên tăng 30%, vui quá.','text'),
(4,1,'Nhóm này dành riêng cho Creator đạt trên 50 lượt tải nhé.','text'),
(5,4,'Yêu cầu rút tiền của bạn đã được xử lý thành công.','text'),
(5,6,'Cảm ơn team support, mình đã nhận được tiền rồi ạ.','text'),
(5,4,'Nếu cần hỗ trợ thêm hãy liên hệ lại nhé.','text'),
(1,7,'Nhân tiện share luôn: Node.js v22 vừa ra stable, anh em update nha.','text'),
(2,3,'Mình vừa test xong script auto comment, hiệu quả lắm.','text'),
(3,2,'Upload tài nguyên mới rồi nha, anh em check thử đi.','text');

-- Avatar Frames
INSERT INTO `avatar_frames` (`id`,`name`,`slug`,`css_class`,`is_premium`) VALUES
(1,'Neon Frame','neon-frame','frame-neon',0),
(2,'Gold Creator Frame','gold-creator-frame','frame-gold',1),
(3,'Developer Frame','developer-frame','frame-developer',0),
(4,'Premium Frame','premium-frame','frame-premium',1);

-- Reels
INSERT INTO `reels` (`id`,`user_id`,`title`,`caption`,`video_url`,`thumbnail_url`,`category`,`hashtags`,`views_count`,`likes_count`,`comments_count`,`status`) VALUES
(1,5,'Demo tool tự động hóa nội dung Facebook','Demo tool tự động hóa nội dung Facebook 🚀 #automation #facebook','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400','Công nghệ','["automation","facebook","tool"]',15000,12400,342,'published'),
(2,2,'3 source code Node.js đáng dùng cho creator','3 source code Node.js đáng dùng cho creator #nodejs #coding','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400','Công nghệ','["nodejs","coding","creator"]',9200,8500,156,'published'),
(3,3,'Cách làm landing page bán tài nguyên số','Cách làm landing page bán tài nguyên số cực xịn #uiux #webdesign','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400','Tool MXH','["uiux","webdesign","landing"]',48000,45200,890,'published'),
(4,7,'Review template chat giống Messenger','Review template chat giống Messenger bằng React Native #reactnative','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400','Công nghệ','["reactnative","chat","review"]',3800,3200,45,'published'),
(5,8,'Một ngày làm nhiệm vụ kiếm tiền','Một ngày làm nhiệm vụ kiếm tiền trên MXH Resource Hub 💸','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1518770660439-4636190af475?w=400','Kiếm tiền','["kiemtien","tasks","income"]',6200,5600,230,'published'),
(6,2,'Hướng dẫn deploy Next.js lên Vercel miễn phí','Deploy Next.js lên Vercel miễn phí trong 5 phút #nextjs #vercel','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1472851294608-062f124dcb02?w=400','Công nghệ','["nextjs","vercel","deploy"]',12000,9800,310,'published'),
(7,3,'Top 5 UI Kit miễn phí cho React Developer','Top 5 UI Kit miễn phí cho React Developer #react #uikit','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400','Công nghệ','["react","uikit","free"]',8500,7200,180,'published'),
(8,5,'Script auto tăng follow Instagram an toàn','Script auto tăng follow Instagram an toàn 2026 #instagram #automation','https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4','https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400','Tool MXH','["instagram","automation","growth"]',22000,18000,560,'published');

-- Tasks
INSERT INTO `tasks` (`id`,`created_by`,`title`,`type`,`description`,`reward_amount`,`estimated_time`,`total_slots`,`used_slots`,`status`) VALUES
(1,4,'Xem 5 video Reels công nghệ','watch_reels','Xem ít nhất 5 video trong chuyên mục Công Nghệ, mỗi video xem tối thiểu 30 giây và thả tim.',15000,'5 phút',500,125,'active'),
(2,4,'Chia sẻ 1 bài blog lên Facebook','share_blog','Share một bài viết bất kỳ trong mục Blog lên Facebook cá nhân ở chế độ công khai, kèm hashtag #MXHResourceHub.',25000,'2 phút',300,84,'active'),
(3,4,'Review tài nguyên Node.js Blog CMS','review_resource','Tải và trải nghiệm source code Node.js Blog CMS, sau đó để lại đánh giá 5 sao kèm nhận xét chi tiết ít nhất 50 từ.',35000,'15 phút',100,12,'active'),
(4,4,'Mời 1 thành viên mới đăng ký','invite_friend','Sử dụng link giới thiệu của bạn mời 1 người bạn đăng ký tài khoản và xác thực email thành công.',50000,'Không giới hạn',1000,340,'active'),
(5,4,'Đăng 1 Reels giới thiệu tool MXH','post_reel','Tạo 1 video Reels ngắn giới thiệu một tool mạng xã hội bạn hay dùng, đăng lên nền tảng với hashtag #ReviewTool.',80000,'30 phút',50,4,'active'),
(6,4,'Hoàn thành khảo sát UX/UI','survey','Điền form khảo sát 10 câu hỏi về trải nghiệm giao diện mới của nền tảng.',20000,'5 phút',200,210,'ended'),
(7,4,'Bình luận chất lượng vào 3 bài viết','comment','Để lại 3 bình luận (ít nhất 20 từ) mang tính xây dựng vào 3 bài viết khác nhau trong mục Cộng đồng.',10000,'5 phút',400,56,'active'),
(8,4,'Upload 1 source code miễn phí','upload_source','Chia sẻ 1 source code do bạn tự code hoặc có bản quyền chia sẻ lên mục Tài nguyên với giá 0đ.',100000,'10 phút',100,8,'active'),
(9,4,'Xem 10 video Reels kiếm tiền','watch_reels','Xem ít nhất 10 video trong chuyên mục Kiếm tiền, tương tác thả tim và bình luận.',25000,'10 phút',300,45,'active'),
(10,4,'Mời 3 thành viên mới (Combo)','invite_friend','Mời 3 người bạn đăng ký thành công để nhận thưởng combo cao hơn.',120000,'Không giới hạn',200,15,'active');

-- Task Submissions
INSERT INTO `task_submissions` (`task_id`,`user_id`,`proof_url`,`note`,`reward_amount`,`status`,`reviewed_by`,`reviewed_at`) VALUES
(1,6,'https://example.com/proof/1.jpg','Mình đã xem đủ 5 video và thả tim hết rồi ạ',15000,'approved',4,'2026-05-10 10:00:00'),
(2,6,'https://example.com/proof/2.jpg','Đã share lên Facebook cá nhân với hashtag đúng yêu cầu',25000,'approved',4,'2026-05-11 09:30:00'),
(3,8,'https://example.com/proof/3.jpg','Đã review Node.js Blog CMS với nhận xét chi tiết',35000,'pending',NULL,NULL),
(4,6,'https://example.com/proof/4.jpg','Đã mời bạn Trung đăng ký thành công',50000,'approved',4,'2026-05-09 14:00:00'),
(5,8,'https://example.com/proof/5.jpg','Đã đăng Reels giới thiệu tool MXH',80000,'pending',NULL,NULL),
(7,6,'https://example.com/proof/6.jpg','Đã bình luận vào 3 bài viết trong mục Cộng đồng',10000,'rejected',4,'2026-05-12 11:00:00');

-- Wallet Transactions
INSERT INTO `wallet_transactions` (`user_id`,`type`,`amount`,`status`,`reference_code`,`note`) VALUES
(6,'task_reward',15000,'success','TX-001','Thưởng nhiệm vụ: Xem 5 video Reels công nghệ'),
(6,'task_reward',25000,'success','TX-002','Thưởng nhiệm vụ: Chia sẻ bài blog lên Facebook'),
(6,'withdraw',-500000,'pending','WD-001','Yêu cầu rút tiền về MB Bank'),
(2,'task_reward',35000,'success','TX-003','Thưởng nhiệm vụ: Review tài nguyên'),
(2,'withdraw',-1000000,'success','WD-002','Rút tiền về Vietcombank'),
(6,'task_reward',50000,'success','TX-004','Thưởng nhiệm vụ: Mời thành viên mới'),
(8,'task_reward',80000,'pending','TX-005','Thưởng nhiệm vụ: Đăng Reels - chờ duyệt'),
(2,'task_reward',100000,'success','TX-006','Thưởng nhiệm vụ: Upload source code'),
(3,'task_reward',250000,'success','TX-007','Doanh thu bán tài nguyên tháng 5'),
(7,'task_reward',150000,'success','TX-008','Doanh thu bán tài nguyên tháng 5');

-- Withdraw Requests
INSERT INTO `withdraw_requests` (`user_id`,`amount`,`method`,`account_name`,`account_number`,`bank_name`,`note`,`status`,`processed_by`,`processed_at`) VALUES
(6,500000,'bank','Nguyễn Văn Thảo','1234567890','MB Bank','Rút tiền tháng 5','pending',NULL,NULL),
(2,1000000,'bank','Trần Minh Dev','9876543210','Vietcombank','Rút tiền doanh thu','success',4,'2026-05-10 15:00:00'),
(8,200000,'momo','Lê Thị Mai','0912345678',NULL,'Rút về Momo','processing',4,NULL),
(3,500000,'zalopay','Phạm Linh Creator','0987654321',NULL,'Rút về ZaloPay','pending',NULL,NULL),
(7,300000,'bank','Nguyễn Khoa Node','5544332211','ACB Bank','Rút doanh thu tháng 4','success',4,'2026-04-28 10:00:00');

SET FOREIGN_KEY_CHECKS = 1;
