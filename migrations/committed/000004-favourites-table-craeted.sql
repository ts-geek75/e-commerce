--! Previous: sha1:f97dd226c57bab5a7a128d8556ff9e8c86fd2c6d
--! Hash: sha1:23e33d63948a1990feb56b9f8d287bd835c6c15a
--! Message: Favourites Table craeted

-- Enter migration here
CREATE TABLE IF NOT EXISTS favourites (
   id SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL,
   product_uuid UUID NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   UNIQUE (user_id, product_uuid)
);
