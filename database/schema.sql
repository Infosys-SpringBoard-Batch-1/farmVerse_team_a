-- =====================================================
-- FarmVerse - Precision Agriculture Management Platform
-- Database Schema
-- Database: PostgreSQL
-- =====================================================

-- ==========================
-- USERS
-- ==========================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN','FARMER','AGRONOMIST')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- FARMERS
-- ==========================
CREATE TABLE farmers (
    farmer_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',

    CONSTRAINT fk_farmer_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- ==========================
-- FARMS
-- ==========================
CREATE TABLE farms (
    farm_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    area_acres DECIMAL(8,2) NOT NULL,
    soil_type VARCHAR(50),
    irrigation_source VARCHAR(100),

    CONSTRAINT fk_farm_farmer
    FOREIGN KEY (farmer_id)
    REFERENCES farmers(farmer_id)
    ON DELETE CASCADE
);

-- ==========================
-- CROPS
-- ==========================
CREATE TABLE crops (
    crop_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    crop_season VARCHAR(50),
    sowing_date DATE,
    expected_harvest_date DATE,
    crop_status VARCHAR(30),
    crop_health VARCHAR(30),

    CONSTRAINT fk_crop_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- IRRIGATION
-- ==========================
CREATE TABLE irrigation (
    irrigation_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    irrigation_type VARCHAR(50),
    irrigation_date DATE,
    water_quantity_liters DECIMAL(10,2),

    water_level DECIMAL(5,2),
    irrigation_status VARCHAR(30),
    next_irrigation_date DATE,

    CONSTRAINT fk_irrigation_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- FERTILIZERS
-- ==========================
CREATE TABLE fertilizers (
    fertilizer_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    fertilizer_name VARCHAR(100) NOT NULL,
    quantity_kg DECIMAL(10,2),
    application_date DATE,

    CONSTRAINT fk_fertilizer_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- WEATHER
-- ==========================
CREATE TABLE weather (
    weather_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(5,2),

    wind_speed DECIMAL(5,2),
    weather_condition VARCHAR(50),

    weather_date DATE,

    CONSTRAINT fk_weather_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- PEST REPORTS
-- ==========================
CREATE TABLE pest_reports (
    report_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL,
    pest_name VARCHAR(100) NOT NULL,
    severity VARCHAR(20),
    treatment VARCHAR(255),
    report_date DATE NOT NULL,

    CONSTRAINT fk_pest_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- HARVESTS
-- ==========================
CREATE TABLE harvests (
    harvest_id SERIAL PRIMARY KEY,
    crop_id INTEGER NOT NULL,
    harvest_date DATE,
    quantity_kg DECIMAL(10,2),
    quality_grade VARCHAR(20),

    market_price DECIMAL(10,2),
    total_revenue DECIMAL(12,2),

    CONSTRAINT fk_harvest_crop
    FOREIGN KEY (crop_id)
    REFERENCES crops(crop_id)
    ON DELETE CASCADE
);

-- ==========================
-- AI RECOMMENDATIONS
-- ==========================
CREATE TABLE ai_recommendations (
    recommendation_id SERIAL PRIMARY KEY,

    farm_id INTEGER NOT NULL,

    recommended_crop VARCHAR(100),

    fertilizer_recommendation TEXT,

    irrigation_recommendation TEXT,

    disease_prediction TEXT,

    confidence_score DECIMAL(5,2),

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ai_farm
    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);

-- ==========================
-- ACTIVITY LOGS
-- ==========================
CREATE TABLE activity_logs (
    activity_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    activity VARCHAR(100),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
