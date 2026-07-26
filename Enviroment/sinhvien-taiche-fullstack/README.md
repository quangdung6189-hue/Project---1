# 🌱 Sinh Viên Tái Chế - EcoValue

> **Dự án xã hội** - Phân loại và tái chế rác thải bền vững tại khuôn viên trường học.

[![Deploy](https://github.com/your-org/svtaiche/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-org/svtaiche/actions/workflows/deploy.yml)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

---

## 📋 Mục Lục

- [Kiến Trúc Hệ Thống](#-kiến-trúc-hệ-thống)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [Hướng Dẫn Cài Đặt](#-hướng-dẫn-cài-đặt)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Triển Khai (Deployment)](#-triển-khai-deployment)
- [Bảo Mật](#-bảo-mật)
- [Đóng Góp](#-đóng-góp)
- [Giấy Phép](#-giấy-phép)

---

## 🏗 Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────┐
│                   NGƯỜI DÙNG                        │
│            (Trình duyệt Web / Mobile)               │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              🌐 FRONTEND (React SPA)                │
│           Vite + Tailwind CSS + React Router        │
│           Deployed on Nginx (Port 80)               │
└──────────────────┬──────────────────────────────────┘
                   │ API Calls (REST)
                   ▼
┌─────────────────────────────────────────────────────┐
│              🔒 Nginx Reverse Proxy                 │
│         SSL Termination + Static Files              │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              ⚙️ BACKEND (Node.js + Express)         │
│           Port 4000 - REST API Server               │
│    Helmet + CORS + Rate Limiting + JWT Auth        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              🗄️ DATABASE (PostgreSQL 16)           │
│           7 Tables + Indexes + Migrations           │
└─────────────────────────────────────────────────────┘
```

## 🔧 Công Nghệ Sử Dụng

### Frontend
| Công nghệ | Mục đích |
|-----------|----------|
| **React 18** | UI Framework |
| **Vite 5** | Build tool & Dev server |
| **Tailwind CSS 3** | Utility-first CSS |
| **React Router 6** | Client-side routing |
| **Axios** | HTTP client |
| **Supabase JS** | Database client (optional) |
| **canvas-confetti** | Hiệu ứng ăn mừng |

### Backend
| Công nghệ | Mục đích |
|-----------|----------|
| **Node.js 20** | Runtime |
| **Express 4** | Web framework |
| **PostgreSQL 16** | Database |
| **pg** | PostgreSQL client |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password hashing |
| **Helmet** | Security headers |
| **Zod** | Input validation |
| **Winston** | Logging |
| **express-rate-limit** | Rate limiting |

### DevOps
| Công nghệ | Mục đích |
|-----------|----------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Nginx** | Reverse proxy & static file serving |
| **GitHub Actions** | CI/CD Pipeline |

## 📁 Cấu Trúc Thư Mục

```
sinhvien-taiche-fullstack/
├── frontend/                    # React SPA
│   ├── public/
│   │   ├── robots.txt          # SEO - Robot rules
│   │   └── sitemap.xml         # SEO - Site map
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/           # WasteSortingGame
│   │   │   ├── layout/         # Header, Footer, Layout
│   │   │   ├── sections/       # Hero, Problem, Solution...
│   │   │   └── ui/             # Modal, Toast, ArticleModal
│   │   ├── context/            # ToastContext
│   │   ├── hooks/              # useToast
│   │   ├── services/           # API client, Supabase
│   │   └── utils/              # Constants, helpers, gameData
│   ├── index.html              # Entry HTML with SEO meta
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                     # Express REST API
│   ├── migrations/             # SQL migrations
│   ├── src/
│   │   ├── config/             # Database, env, migrate, seed
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── routes/             # Express routes
│   │   ├── tests/              # API tests
│   │   └── utils/              # Logger, helpers
│   └── package.json
│
├── docker/                      # Docker configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── nginx.conf
│   └── docker-compose.yml
│
├── scripts/
│   └── setup.sh                # One-click setup script
│
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
│
├── .env.example                 # Environment variables template
├── .gitignore
└── README.md
```

## 🚀 Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js 18+
- npm 9+
- PostgreSQL 14+ (cho backend)
- Docker & Docker Compose (cho deployment)

### 1. Clone & Cài Đặt Nhanh

```bash
# Clone repository
git clone https://github.com/your-org/svtaiche.git
cd svtaiche

# Chạy script setup (tự động cài đặt mọi thứ)
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Cài Đặt Thủ Công

#### Backend
```bash
cd backend

# Copy env
cp ../.env.example .env
# Chỉnh sửa file .env với thông tin database của bạn

# Cài dependencies
npm install

# Chạy migrations & seed data
npm run migrate
npm run seed

# Khởi động server
npm run dev
```

#### Frontend
```bash
cd frontend

# Copy env
cp ../.env.example .env

# Cài dependencies
npm install

# Khởi động dev server
npm run dev
```

### 3. Chạy Với Docker

```bash
# Build & start tất cả services
docker-compose -f docker/docker-compose.yml up -d --build

# Kiểm tra logs
docker-compose -f docker/docker-compose.yml logs -f

# Dừng services
docker-compose -f docker/docker-compose.yml down
```

## 📡 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|------|------|
| `GET` | `/api/health` | Health check | - |
| `POST` | `/api/auth/login` | Đăng nhập | - |
| `POST` | `/api/auth/register` | Đăng ký | - |
| `GET` | `/api/auth/profile` | Xem profile | JWT |
| `PUT` | `/api/auth/profile` | Cập nhật profile | JWT |
| `GET` | `/api/articles` | Danh sách bài viết | - |
| `GET` | `/api/articles/:slug` | Chi tiết bài viết | - |
| `POST` | `/api/schedules` | Tạo lịch thu gom | - |
| `GET` | `/api/schedules` | DS lịch thu gom | Admin |
| `GET` | `/api/team` | DS thành viên | - |
| `POST` | `/api/partners` | Đăng ký đối tác | - |
| `GET` | `/api/vouchers` | DS voucher | - |
| `POST` | `/api/vouchers/redeem` | Đổi voucher | JWT |

## 🗄 Database Schema

```sql
-- 7 tables chính:
- users           # Người dùng / Authentication
- collection_schedules  # Lịch thu gom rác
- articles        # Bài viết cẩm nang
- team_members    # Đội ngũ thực hiện
- partners        # Đối tác B2B
- vouchers        # Cửa hàng voucher
- user_vouchers   # Lịch sử đổi voucher
```

## 🛡 Bảo Mật

- **Helmet.js** - HTTP headers bảo mật
- **CORS** - Chặn truy cập trái phép
- **JWT Authentication** - Xác thực người dùng
- **Bcrypt** - Mã hóa mật khẩu (12 rounds)
- **Rate Limiting** - Chống brute force
- **Input Validation** - Zod schema validation
- **SQL Injection** - Parameterized queries
- **Row-Level Security** - Supabase RLS (optional)

## 📊 Monitoring

- **Endpoint health check**: `GET /api/health`
- **Logging**: Winston (file + console)
- **Error tracking**: Sentry-ready (add DSN)
- **Uptime monitoring**: UptimeRobot ready

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch feature: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'feat: add new feature'`
4. Push: `git push origin feature/my-feature`
5. Tạo Pull Request

## 📄 Giấy Phép

Dự án được phát triển bởi **Group 5 - Lớp N04**  
Trường Đại học CMC (CMC University)  
Môn học: Kỹ Năng Mềm & Tư Duy Khởi Nghiệp  
Giảng viên: ThS. Hoàng Thu Phương

---

<p align="center">
  <i>🌱 "Nhỏ bé nhưng kiên trì, từng vỏ chai đều có một tương lai mới."</i>
  <br><br>
  <strong>SV TÁI CHẾ - Hành Động Xanh Vì Tương Lai</strong>
</p>

