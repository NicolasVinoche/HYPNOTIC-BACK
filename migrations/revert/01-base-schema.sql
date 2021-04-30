-- Revert hypnotic_peafowl:01-base-schema from pg

BEGIN;

DROP TABLE users, subscriptions, masterclasses, packs, albums, streams, tips, _m2m_user_tips, _m2m_user_packs, _m2m_user_subscriptions;

COMMIT;

