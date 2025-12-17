--! Previous: sha1:1f670428415e10b7be9c31a7c89d8ddfb03491e7
--! Hash: sha1:d02ab42cd2f6a0ec03075915cdfd3f093f621332
--! Message: Alter_Products_Table

-- Enter migration here
ALTER TABLE products
ADD COLUMN material VARCHAR(100),
ADD COLUMN dimension VARCHAR(100),
ADD COLUMN weight VARCHAR(50),
ADD COLUMN editors_note TEXT;
