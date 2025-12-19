--! Previous: sha1:0d5a47ed35f8d7a6100fa676ffa3dd25adb0ed2b
--! Hash: sha1:a8e78f1efb6aed34e14d758ddad61b67314f43f8
--! Message: craeted cart table

-- Enter migration here
-- Enable UUID generation
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add UUID column
ALTER TABLE users
ADD COLUMN uuid UUID DEFAULT gen_random_uuid() NOT NULL;

-- Add UNIQUE constraint
ALTER TABLE users
ADD CONSTRAINT users_uuid_unique UNIQUE (uuid);

-- Drop old tables
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;

-- Create carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(uuid) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Create cart_items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE (cart_id, product_id)
);
