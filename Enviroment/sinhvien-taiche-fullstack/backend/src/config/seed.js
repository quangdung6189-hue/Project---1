import pool from './database.js';

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Seed Team Members
    await pool.query(`
      INSERT INTO team_members (name, role, description, icon, specialization, display_order, is_mentor) VALUES
      ('ThS. Hoàng Thu Phương', 'Giảng viên hướng dẫn', 'Người thắp lửa ý tưởng sáng tạo, định hướng tư duy khởi nghiệp xã hội.', 'fa-chalkboard-user', 'Định hướng & Cố vấn', 0, true),
      ('Hoàng Mạnh Dũng', 'Trưởng nhóm', 'Chịu trách nhiệm điều phối tổng thể các hoạt động.', 'fa-crown', 'Điều phối & Đối tác', 1, false),
      ('Đặng Quang Dũng', 'Kỹ thuật chính', 'Xây dựng hướng dẫn kỹ thuật phân loại và phát triển nền tảng số.', 'fa-laptop-code', 'Kỹ thuật & Vật liệu', 2, false),
      ('Nguyễn Tùng Dương', 'Truyền thông thị giác', 'Thiết kế hệ thống poster, banner tuyên truyền.', 'fa-photo-film', 'Thiết kế Poster & Video', 3, false),
      ('Lương Nguyễn Ánh Dương', 'Sáng tạo nội dung', 'Chắp bút viết bài truyền thông cho dự án.', 'fa-pen-nib', 'Viết bài & Nội dung', 4, false),
      ('Nguyễn Như Quỳnh', 'Quản lý tài chính', 'Kiểm soát nguồn kinh phí và quản lý dòng tiền gây quỹ.', 'fa-wallet', 'Tài chính & Quản lý quỹ', 5, false),
      ('Phạm Duy Anh', 'Quản lý hậu cần', 'Giám sát lắp ráp và bảo trì các trạm thu gom rác.', 'fa-truck-ramp-box', 'Hậu cần & Sự kiện', 6, false)
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Team members seeded');

    // Seed Vouchers (using new schema: code_prefix, total_stock, remaining_stock)
    await pool.query(`
      INSERT INTO vouchers (title, description, code_prefix, points_required, total_stock, remaining_stock, icon, expires_at) VALUES
      ('Voucher Coffee', 'Đổi lấy ly cà phê tại canteen CMC', 'COFFEE', 200, 50, 50, 'fa-mug-hot', NOW() + INTERVAL '6 months'),
      ('Quà tái chế', 'Món quà xanh từ sản phẩm tái chế', 'GREEN', 300, 30, 30, 'fa-gift', NOW() + INTERVAL '6 months'),
      ('Shopee 50k', 'Voucher mua sắm Shopee trị giá 50.000đ', 'SHOP50', 400, 20, 20, 'fa-store', NOW() + INTERVAL '3 months'),
      ('Voucher CGV', 'Voucher xem phim tại CGV', 'CGV', 500, 10, 10, 'fa-ticket', NOW() + INTERVAL '4 months')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Vouchers seeded');

    // Seed Articles (using new schema: author_id is nullable for seed data)
    await pool.query(`
      INSERT INTO articles (title, slug, excerpt, content, category, is_featured, is_published, published_at) VALUES
      (
        'Quy Tắc Phân Loại Rác Tại Nguồn 2026',
        'quy-tac-phan-loai-rac-tai-nguon-2026',
        'Hướng dẫn chi tiết cách phân loại rác thải sinh hoạt thành 3 nhóm.',
        '<p>Việt Nam hiện thải ra khoảng 25 triệu tấn rác thải sinh hoạt mỗi năm. Phân loại rác tại nguồn là giải pháp then chốt...</p>',
        'Hướng dẫn', true, true, NOW()),
      (
        'Hành Trình Tái Chế Nhựa: Từ Vỏ Chai Đến Sợi Vải',
        'hanh-trinh-tai-che-nhua-tu-vo-chai-den-soi-vai',
        'Khám phá vòng đời của một chai nhựa PET qua 5 bước tái chế.',
        '<p>Chai nhựa PET có thể tái chế thành sợi vải polyester - nguyên liệu cho quần áo và túi xách...</p>',
        'Kiến thức', false, true, NOW()),
      (
        'CMC Uni Xanh: Sinh Viên Chung Tay Bảo Vệ Môi Trường',
        'cmc-uni-xanh-sinh-vien-chung-tay-bao-ve-moi-truong',
        'Chiến dịch "Trường học Xanh" thu hút hơn 500 sinh viên tham gia.',
        '<p>Ngày 28/02/2026, Đoàn trường Đại học CMC phát động chiến dịch "Trường học Xanh"...</p>',
        'Sự kiện', false, true, NOW()),
      (
        '5 Mẹo Giảm Rác Thải Nhựa Trong Sinh Hoạt Hàng Ngày',
        '5-meo-giam-rac-thai-nhua-trong-sinh-hoat-hang-ngay',
        'Áp dụng 5 thói quen đơn giản để cắt giảm 70% lượng nhựa dùng một lần.',
        '<p>Rác thải nhựa đang là vấn đề môi trường cấp bách. Mỗi năm thế giới thải ra hơn 300 triệu tấn nhựa...</p>',
        'Mẹo hay', false, true, NOW())
      ON CONFLICT (slug) DO NOTHING;
    `);
    console.log('✅ Articles seeded');

    // Seed admin user for testing (password: Admin@123)
    await pool.query(`
      INSERT INTO users (email, password_hash, full_name, phone, role, status)
      VALUES (
        'admin@svtaiche.edu.vn',
        '$2a$12$LJ3m4ys3Lg3YOBGkMN7N3uK5vHy3sL8qH1wB6k9R0cV7fZ2dGqWKu',
        'Admin SV Tái Chế',
        '0987654321',
        'admin',
        'active'
      )
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('✅ Admin user seeded');

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await pool.end();
  }
}

seedDatabase();

