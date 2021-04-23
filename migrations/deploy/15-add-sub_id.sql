-- Deploy hypnotic_peafowl:15-add-sub_id to pg

BEGIN;

ALTER TABLE users
ADD COLUMN "sub_end" INT;

COMMIT;
