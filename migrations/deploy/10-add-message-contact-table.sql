-- Deploy hypnotic_peafowl:10-add-message-contact-table to pg

BEGIN;

CREATE TABLE message_contact (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    title TEXT NOT NULL, 
    content TEXT NOT NULL, 
    pseudo TEXT NOT NULL
); 

ALTER TABLE message_contact 
ADD COLUMN "user_id" INT REFERENCES users(id);

COMMIT;
