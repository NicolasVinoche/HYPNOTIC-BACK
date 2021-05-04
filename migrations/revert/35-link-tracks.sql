-- Revert hypnotic_peafowl:35-link-tracks from pg

BEGIN;

ALTER TABLE tracks
RENAME COLUMN link TO bucket_link;

COMMIT;
