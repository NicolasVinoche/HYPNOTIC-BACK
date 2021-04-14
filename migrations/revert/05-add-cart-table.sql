-- Revert hypnotic_peafowl:05-add-cart-table from pg

BEGIN;

ALTER TABLE users 
DROP COLUMN cart;

COMMIT;
