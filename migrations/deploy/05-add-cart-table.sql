-- Deploy hypnotic_peafowl:05-add-cart-table to pg

BEGIN;

ALTER TABLE users 
ADD COLUMN cart TEXT;

COMMIT;
