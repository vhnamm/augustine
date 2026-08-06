-- ========================================================
-- 1. SEED ROLES (Không dùng prefix ROLE_)
-- ========================================================
INSERT INTO roles (name, description) VALUES
                                               ('ADMIN', 'Quản trị viên toàn quyền hệ thống'),
                                               ('EMPLOYEE', 'Nhân viên vận hành: Duyệt đơn, cập nhật trạng thái kho và xử lý đánh giá'),
                                               ('USER', 'Khách hàng đã đăng nhập'),
                                               ('GUEST', 'Khách vãng lai chưa đăng nhập');

-- ========================================================
-- 2. SEED PERMISSIONS
-- ========================================================
INSERT INTO permissions (name, description) VALUES
-- --- SẢN PHẨM & DANH MỤC ---
('product:read_public', 'Xem sản phẩm công khai (Client)'),
('product:read_internal', 'Xem chi tiết sản phẩm nội bộ (Giá gốc, tồn kho chi tiết)'),
('product:create', 'Tạo mới sản phẩm (Admin only)'),
('product:update', 'Cập nhật thông tin sản phẩm và biến thể (Admin only)'),
('product:delete', 'Xóa hoặc ẩn sản phẩm (Admin only)'),
('category:manage', 'Quản lý danh mục (Admin only)'),
('attribute:manage', 'Quản lý màu, size, thuộc tính (Admin only)'),

-- --- BỘ SƯU TẬP & BANNER ---
('collection:read', 'Xem danh sách bộ sưu tập'),
('collection:manage', 'Tạo, sửa, xóa bộ sưu tập (Admin/Marketing Manager only)'),
('banner:manage', 'Quản lý banner trang chủ (Admin/Marketing Manager only)'),

-- --- ĐƠN HÀNG & VẬN HÀNH (Chức năng cốt lõi của EMPLOYEE) ---
('order:create', 'Tạo đơn hàng mới (Khách đặt)'),
('order:read_self', 'Xem đơn hàng cá nhân'),
('order:read_all', 'Xem danh sách tất cả đơn hàng hệ thống'),
('order:approve', 'Xác nhận đơn, chuyển trạng thái giao hàng (Fulfillment)'),
('order:cancel_self', 'Khách tự hủy đơn'),
('order:cancel_any', 'Nhân viên/Admin hủy đơn khi có sự cố'),

-- --- THANH TOÁN & ĐÁNH GIÁ ---
('payment:read', 'Xem lịch sử giao dịch thanh toán'),
('payment:refund', 'Thực hiện hoàn tiền (Admin only)'),
('review:create', 'Viết đánh giá sản phẩm'),
('review:read', 'Xem danh sách đánh giá'),
('review:delete', 'Xóa/Ẩn đánh giá vi phạm, spam'),

-- --- KHÁCH HÀNG & HỆ THỐNG ---
('wishlist:read', 'Xem danh sách yêu thích'),
('wishlist:add_remove', 'Thêm/Xóa wishlist'),
('home:personalized', 'Xem trang chủ cá nhân hóa'),
('profile:manage', 'Cập nhật thông tin cá nhân'),
('user:manage', 'Quản lý tài khoản (Admin only)'),
('role:manage', 'Quản lý vai trò (Admin only)'),
('report:view', 'Xem báo cáo doanh thu');

-- ========================================================
-- 3. MAPPING ROLE_PERMISSIONS
-- ========================================================

-- A. GUEST
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON p.name IN (
    'product:read_public', 'collection:read', 'review:read'
) WHERE r.name = 'GUEST';

-- B. USER (Khách hàng)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON p.name IN (
    'product:read_public', 'collection:read', 'review:read', 'review:create',
    'order:create', 'order:read_self', 'order:cancel_self',
    'wishlist:read', 'wishlist:add_remove', 'home:personalized', 'profile:manage'
) WHERE r.name = 'USER';

-- C. EMPLOYEE (Nhân viên vận hành - CHỈ XỬ LÝ ĐƠN HÀNG, REVIEW & XEM DỮ LIỆU)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON p.name IN (
    'product:read_public', 'product:read_internal', 'collection:read',
    'order:read_all', 'order:approve', 'order:cancel_any',
    'payment:read', 'review:read', 'review:delete', 'profile:manage'
) WHERE r.name = 'EMPLOYEE';

-- D. ADMIN (Toàn quyền 100%)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r JOIN permissions p ON r.name = 'ADMIN';

-- ========================================================
-- 1. SEED DATA TABE: users
-- ========================================================
INSERT INTO users (id, email, password, full_name, avatar, role_id, locked, created_at, deleted_at) VALUES
                                                                                                        (1, 'admin@augustine.com', '$2a$10$a/rFa5Ka18aLY.ffvL6SX.Yg27SPtBTKKXhTfzV23jJSHe291k3S6', 'System Admin', NULL, 1, FALSE, CURRENT_TIMESTAMP, NULL),
                                                                                                        (2, 'employee@augustine.com', '$2a$10$a/rFa5Ka18aLY.ffvL6SX.Yg27SPtBTKKXhTfzV23jJSHe291k3S6', 'Trần Nhân Viên', NULL, 2, FALSE, CURRENT_TIMESTAMP, NULL),
                                                                                                        (3, 'hoainam@gmail.com', '$2a$10$a/rFa5Ka18aLY.ffvL6SX.Yg27SPtBTKKXhTfzV23jJSHe291k3S6', 'Hoài Nam', NULL, 3, FALSE, CURRENT_TIMESTAMP, NULL),
                                                                                                        (4, 'khachhang2@gmail.com', '$2a$10$a/rFa5Ka18aLY.ffvL6SX.Yg27SPtBTKKXhTfzV23jJSHe291k3S6', 'Nguyễn Thị Khách', NULL, 3, FALSE, CURRENT_TIMESTAMP, NULL);
-- ========================================================
-- 2. SEED DATA TABLE: user_address
-- ========================================================
INSERT INTO user_address (id, user_id, phone, province, ward, detail, is_default) VALUES
-- Địa chỉ của Hoài Nam (user_id = 3)
(1, 3, '0987654321', 'Thành phố Hà Nội', 'Phường Mộ Lao', 'Số nhà 12, Ngõ 34, Khu đô thị Mỗ Lao, Quận Hà Đông', true),
(2, 3, '0987654321', 'Thành phố Hà Nội', 'Phường Trung Văn', 'Trường PTIT, Km10 Đường Nguyễn Trãi, Quận Nam Từ Liêm', false),

-- Địa chỉ của Khách hàng 2 (user_id = 4)
(3, 4, '0912345678', 'Thành phố Hồ Chí Minh', 'Phường Bến Nghé', 'Tòa nhà Bitexco, Số 2 Hải Triều, Quận 1', true);