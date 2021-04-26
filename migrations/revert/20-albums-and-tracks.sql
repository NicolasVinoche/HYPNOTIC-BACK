-- Revert hypnotic_peafowl:20-albums-and-tracks from pg

BEGIN;

DROP TABLE tracks; 

ALTER TABLE albums
DROP COLUMN "description";

ALTER TABLE albums 
RENAME COLUMN cover TO image_path; 

COMMIT;
