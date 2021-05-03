-- Revert hypnotic_peafowl:25-isLogged from pg

BEGIN;

ALTER TABLE users
DROP COLUMN isLogged;

COMMIT;
