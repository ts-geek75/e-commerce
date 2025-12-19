--! Previous: sha1:a4bf09d9acc7f154994bacb51cbb63292b8b6e88
--! Hash: sha1:f97dd226c57bab5a7a128d8556ff9e8c86fd2c6d
--! Message: Cart table

-- Enter migration here
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;

CREATE TABLE carts (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   user_id UUID UNIQUE NOT NULL REFERENCES users(uuid) ON DELETE CASCADE,
   created_at TIMESTAMP DEFAULT now(),
   updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE cart_items (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
   product_id UUID NOT NULL,
   quantity INT NOT NULL CHECK (quantity > 0),
   UNIQUE (cart_id, product_id)
);
