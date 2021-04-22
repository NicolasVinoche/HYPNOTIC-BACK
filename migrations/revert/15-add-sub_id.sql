-- Revert hypnotic_peafowl:15-add-sub_id from pg

BEGIN;

ALTER TABLE users 
DROP COLUMN "sub_id";

COMMIT;
