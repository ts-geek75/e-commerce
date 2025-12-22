--! Previous: sha1:23e33d63948a1990feb56b9f8d287bd835c6c15a
--! Hash: sha1:0c1371d00020d10820db2107e60049e10639b021
--! Message: Favourites Table alterd

-- Enter migration here
ALTER TABLE favourites DROP COLUMN user_id;

ALTER TABLE favourites
ADD COLUMN user_id UUID NOT NULL;
