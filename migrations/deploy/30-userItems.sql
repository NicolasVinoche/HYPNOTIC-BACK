-- Deploy hypnotic_peafowl:30-userItems to pg

BEGIN;

ALTER TABLE users
ADD COLUMN items TEXT DEFAULT '[]';

COMMIT;
