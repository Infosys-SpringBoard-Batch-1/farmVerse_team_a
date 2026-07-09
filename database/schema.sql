-- =====================================================
-- FarmVerse - Precision Agriculture Management Platform
-- Database: PostgreSQL
-- =====================================================

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('ADMIN', 'FARMER', 'GUEST')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FARMS TABLE
-- ============================================
CREATE TABLE farms (
    farm_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    size DECIMAL(10,2) NOT NULL,
    soil_type VARCHAR(50),

    CONSTRAINT fk_farm_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- ============================================
-- CROPS TABLE
-- ============================================
CREATE TABLE crops (
    crop_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    sowing_date DATE,
    expected_harvest_date DATE,
    growth_stage VARCHAR(50),

    CONSTRAINT fk_crop_farm
        FOREIGN KEY (farm_id)
        REFERENCES farms(farm_id)
        ON DELETE CASCADE
);

-- ============================================
-- CROP IMAGES TABLE
-- ============================================
CREATE TABLE crop_images (
    image_id SERIAL PRIMARY KEY,
    crop_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_image_crop
        FOREIGN KEY (crop_id)
        REFERENCES crops(crop_id)
        ON DELETE CASCADE
);

-- ============================================
-- CROP PRICES TABLE
-- ============================================
CREATE TABLE crop_prices (
    price_id SERIAL PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_farm_user
ON farms(user_id);

CREATE INDEX idx_crop_farm
ON crops(farm_id);

CREATE INDEX idx_image_crop
ON crop_images(crop_id);

CREATE INDEX idx_crop_price_name
ON crop_prices(crop_name);
