-- Revert hypnotic_peafowl:10-add-message-contact-table from pg

BEGIN;

DROP TABLE message_contact;

COMMIT;
