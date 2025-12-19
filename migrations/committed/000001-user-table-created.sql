--! Previous: -
--! Hash: sha1:6d7ff978c0ceab1700f58293e0d4584433e11bac
--! Message: User table created

-- Enter migration here
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   uuid UUID DEFAULT gen_random_uuid() NOT NULL,
   username VARCHAR(50) UNIQUE NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   isAdmin BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT users_uuid_unique UNIQUE (uuid)
);
