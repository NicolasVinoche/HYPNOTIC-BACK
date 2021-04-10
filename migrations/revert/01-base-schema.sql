-- Revert hypnotic_peafowl:01-base-schema from pg

BEGIN;

DROP TABLE users, subscriptions, projects, masterclasses, packs, albums, streams, tips, _m2m_user_tips, _m2m_user_projects, _m2m_user_packs, _m2m_user_subscriptions;

COMMIT;

