--! Previous: sha1:0c1371d00020d10820db2107e60049e10639b021
--! Hash: sha1:4afdc76df0ecea7245f3fce15875b241fbfc9780
--! Message: alterd table users

-- Enter migration here
ALTER TABLE users
ADD COLUMN first_name VARCHAR(50),
ADD COLUMN last_name VARCHAR(50),
ADD COLUMN phone VARCHAR(20),
ADD COLUMN address TEXT,
ADD COLUMN city VARCHAR(50),
ADD COLUMN postal_code VARCHAR(20),
ADD COLUMN country VARCHAR(50);
