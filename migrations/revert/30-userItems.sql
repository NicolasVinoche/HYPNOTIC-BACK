-- Revert hypnotic_peafowl:30-userItems from pg

BEGIN;

ALTER TABLE users
DROP COLUMN items;


COMMIT;
