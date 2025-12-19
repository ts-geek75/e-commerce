--! Previous: sha1:a8e78f1efb6aed34e14d758ddad61b67314f43f8
--! Hash: sha1:16f50d622195c5ff3fdaf6da4740cae3729891c7
--! Message: alterd_products_table

-- Enter migration here
ALTER TABLE products
ADD COLUMN uuid UUID DEFAULT gen_random_uuid() NOT NULL;

-- Optional: add a unique constraint to enforce uniqueness
ALTER TABLE products
ADD CONSTRAINT products_uuid_unique UNIQUE (uuid);
