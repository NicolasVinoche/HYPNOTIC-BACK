-- Deploy hypnotic_peafowl:01-base-schema to pg

BEGIN;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL,  
    "role" INT DEFAULT 1, 
    email TEXT NOT NULL, 
    "password" TEXT NOT NULL, 
    pseudo TEXT NOT NULL,  
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
); 

CREATE TABLE subscriptions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "name" TEXT NOT NULL, 
    price NUMERIC(6, 2) NOT NULL, 
    description TEXT
); 

CREATE TABLE projects (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    "description" TEXT NOT NULL, 
    image_path TEXT, 
    video_path TEXT
); 

CREATE TABLE masterclasses (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    "description" TEXT NOT NULL, 
    image_path TEXT, 
    video_path TEXT
); 

CREATE TABLE packs (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    content TEXT, 
    price NUMERIC(6, 2) NOT NULL, 
    tag TEXT
); 

CREATE TABLE albums (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    image_path TEXT
); 

CREATE TABLE streams (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    video_path TEXT, 
    tag TEXT
); 

CREATE TABLE tips (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, 
    category TEXT NOT NULL, 
    image_path TEXT 
); 
 
-- Insertion des FK dans albums

ALTER TABLE albums
ADD COLUMN projects_id INT REFERENCES projects (id); 

-- Tables de liaisons

CREATE TABLE _m2m_user_tips ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    users_id INT REFERENCES users (id), 
    tips_id INT REFERENCES tips (id)
); 

CREATE TABLE _m2m_user_projects (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    users_id INT REFERENCES users (id), 
    projects_id INT REFERENCES projects (id)
); 

CREATE TABLE _m2m_user_packs (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    users_id INT REFERENCES users (id), 
    packs_id INT REFERENCES packs (id)
);

CREATE TABLE _m2m_user_subscriptions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    users_id INT REFERENCES users (id), 
    subscriptions_id INT REFERENCES subscriptions (id),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL
);


COMMIT;