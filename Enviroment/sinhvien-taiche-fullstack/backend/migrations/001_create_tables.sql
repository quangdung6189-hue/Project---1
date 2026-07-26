-- ============================================
-- Sinh Viên Tái Chế - Database Schema
-- PostgreSQL Migration v2.0 (Full Architecture)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'staff', 'moderator', 'admin')),
    avatar_url TEXT,
    eco_points INT DEFAULT 0 CHECK (eco_points >= 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'unverified')),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. COLLECTION SCHEDULES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS collection_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    submission_type VARCHAR(50) NOT NULL CHECK (submission_type IN ('pickup', 'volunteer')),
    contact_name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    waste_type VARCHAR(100) NOT NULL,
    estimated_weight_kg DECIMAL(10, 2) NOT NULL CHECK (estimated_weight_kg > 0),
    actual_weight_kg DECIMAL(10, 2) DEFAULT NULL,
    collection_address TEXT NOT NULL,
    note TEXT,
    points_awarded INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    assigned_staff_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. VOUCHERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    code_prefix VARCHAR(50) NOT NULL,
    description TEXT,
    points_required INT NOT NULL CHECK (points_required > 0),
    total_stock INT NOT NULL CHECK (total_stock >= 0),
    remaining_stock INT NOT NULL CHECK (remaining_stock >= 0),
    image_url TEXT,
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. USER VOUCHERS REDEMPTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS user_vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    voucher_id UUID NOT NULL REFERENCES vouchers(id) ON DELETE RESTRICT,
    redeem_code VARCHAR(100) UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT false,
    used_at TIMESTAMPTZ DEFAULT NULL,
    redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100) NOT NULL,
    author_id UUID REFERENCES users(id),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    avatar_url TEXT,
    icon VARCHAR(100),
    specialization VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_mentor BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. PARTNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    partner_type VARCHAR(100) CHECK (partner_type IN ('recycler', 'sponsor', 'logistics', 'educational', 'collection_unit', 'recycling_factory', 'other')),
    address TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. AUDIT LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id UUID,
    payload JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. OTP VERIFICATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS otps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    otp_code VARCHAR(6) NOT NULL,
    purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('register', 'schedule', 'reset_password', 'verify_phone')),
    reference_id UUID,
    is_verified BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otps_email_purpose ON otps(email, purpose);
CREATE INDEX IF NOT EXISTS idx_otps_reference ON otps(reference_id);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

CREATE INDEX IF NOT EXISTS idx_schedules_user_status ON collection_schedules(user_id, status);
CREATE INDEX IF NOT EXISTS idx_schedules_status_created ON collection_schedules(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_schedules_assigned_staff ON collection_schedules(assigned_staff_id);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);

CREATE INDEX IF NOT EXISTS idx_vouchers_active ON vouchers(is_active, expires_at);

CREATE INDEX IF NOT EXISTS idx_user_vouchers_user ON user_vouchers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_vouchers_voucher ON user_vouchers(voucher_id);

CREATE INDEX IF NOT EXISTS idx_partners_type ON partners(partner_type);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

