--! Previous: sha1:6d7ff978c0ceab1700f58293e0d4584433e11bac
--! Hash: sha1:a4bf09d9acc7f154994bacb51cbb63292b8b6e88
--! Message: Products table

-- Enter migration here
CREATE TABLE products (
   id SERIAL PRIMARY KEY,
   uuid UUID DEFAULT gen_random_uuid() NOT NULL,
   name VARCHAR(100) NOT NULL,
   description TEXT,
   price NUMERIC(10, 2) NOT NULL,
   category VARCHAR(50) NOT NULL,
   image_url TEXT,
   stock INT DEFAULT 0,
   material VARCHAR(100),
   dimension VARCHAR(100),
   weight VARCHAR(50),
   editors_note TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT products_uuid_unique UNIQUE (uuid)
);
