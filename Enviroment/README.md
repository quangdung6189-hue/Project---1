# Sinh viên tái chế — EcoValue

Ứng dụng web phong cách dự án sinh viên, hỗ trợ:
- Form **Đặt lịch thu gom rác tái chế**
- Lưu dữ liệu vào **Supabase**
- Gửi thông báo real-time về **Discord Webhook**
- Hiển thị **Toast Alert** và hiệu ứng **Confetti**

## Cách sử dụng

### 1. Dùng `index.html` hiện tại
1. Mở `index.html` bằng trình duyệt.
2. Tìm và thay thế các giá trị sau trong phần `<script>` cuối trang:
   - `YOUR_SUPABASE_URL`
   - `YOUR_SUPABASE_ANON_KEY`
   - `YOUR_DISCORD_WEBHOOK_URL`
3. Mở ứng dụng và thử gửi một yêu cầu đặt lịch.

### 2. Cấu trúc dữ liệu Supabase
Tạo bảng `collection_schedules` với các cột:
- `submission_type` (text)
- `name` (text)
- `phone` (text)
- `email` (text)
- `waste_type` (text)
- `estimated_weight_kg` (numeric)
- `collection_location` (text)
- `note` (text)
- `eco_points` (numeric)
- `created_at` (timestamp)

### 3. Thiết lập Discord Webhook
1. Vào channel Discord của nhóm quản trị.
2. Tạo webhook mới.
3. Dán URL webhook vào `YOUR_DISCORD_WEBHOOK_URL`.

### 4. Deploy nhanh
- Với file `index.html` tĩnh: bạn có thể dùng **Netlify Drop** hoặc **GitHub Pages**.
- Với React/Vite: upload repo lên GitHub và deploy bằng **Vercel**.

## React/Vite sample project
Thư mục mẫu:
- `sinhvien-taiche-react/`

File cấu hình môi trường:
- `sinhvien-taiche-react/.env.example`

## Lưu ý bảo mật
- Không commit `SUPABASE_ANON_KEY` hoặc webhook vào repo công khai nếu không muốn lộ thông tin.
- Với bản deploy thực tế, nên dùng cơ chế `row-level security` của Supabase để hạn chế quyền ghi.
