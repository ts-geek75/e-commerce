--! Previous: sha1:df9619120c2366b78fa64a91bf38460d544ce539
--! Hash: sha1:1f670428415e10b7be9c31a7c89d8ddfb03491e7
--! Message: create product table

-- Enter migration here
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
