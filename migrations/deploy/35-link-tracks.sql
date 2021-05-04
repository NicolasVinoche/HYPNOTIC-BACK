-- Deploy hypnotic_peafowl:35-link-tracks to pg

BEGIN;

ALTER TABLE tracks
RENAME COLUMN bucket_link TO link;

COMMIT;
