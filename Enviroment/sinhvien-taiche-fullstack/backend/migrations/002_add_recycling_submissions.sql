-- ============================================
-- Migration 002: Recycling Submissions Table
-- EcoValues - Nộp rác nhận điểm
-- ============================================

CREATE TABLE IF NOT EXISTS recycling_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    waste_type VARCHAR(50) NOT NULL CHECK (waste_type IN ('plastic', 'paper', 'metal', 'glass', 'electronic', 'organic', 'other')),
    estimated_weight DECIMAL(6, 2) NOT NULL CHECK (estimated_weight > 0),
    image_url TEXT,                        -- base64 data URI or external URL
    points_awarded INT NOT NULL CHECK (points_awarded >= 0),
    status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recycling_user ON recycling_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_recycling_created ON recycling_submissions(created_at DESC);

-- ============================================
-- Seed initial EcoPoints rules reference
-- (informational, stored in app logic)
-- Plastic: 80 pts, Paper: 60 pts, Metal: 100 pts
-- Glass: 70 pts, Electronic: 150 pts, Other: 50 pts
-- ============================================
