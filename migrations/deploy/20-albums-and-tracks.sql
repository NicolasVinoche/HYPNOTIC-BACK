-- Deploy hypnotic_peafowl:20-albums-and-tracks to pg

BEGIN;


CREATE TABLE tracks (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    track_number INT, 
    title TEXT NOT NULL, 
    "description" TEXT, 
    cover TEXT, 
    price NUMERIC(6, 2) NOT NULL, 
    bucket_link TEXT 
); 

ALTER TABLE tracks
ADD COLUMN album_id INT REFERENCES albums (id);

ALTER TABLE albums 
ADD COLUMN "description" TEXT; 

ALTER TABLE albums 
RENAME COLUMN image_path TO cover; 

COMMIT;
