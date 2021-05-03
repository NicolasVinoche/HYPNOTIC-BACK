-- Deploy hypnotic_peafowl:25-isLogged to pg

BEGIN;

ALTER TABLE users
ADD COLUMN isLogged BOOLEAN NOT NULL 
DEFAULT false;

COMMIT;
