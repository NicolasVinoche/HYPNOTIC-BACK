--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hypnowl; Type: DATABASE; Schema: -; Owner: hypnowl
--

CREATE DATABASE hypnowl WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE hypnowl OWNER TO hypnowl;

\connect hypnowl

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sqitch; Type: SCHEMA; Schema: -; Owner: hypnowl
--

CREATE SCHEMA sqitch;


ALTER SCHEMA sqitch OWNER TO hypnowl;

--
-- Name: SCHEMA sqitch; Type: COMMENT; Schema: -; Owner: hypnowl
--

COMMENT ON SCHEMA sqitch IS 'Sqitch database deployment metadata v1.1.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _m2m_user_packs; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public._m2m_user_packs (
    id integer NOT NULL,
    users_id integer,
    packs_id integer
);


ALTER TABLE public._m2m_user_packs OWNER TO hypnowl;

--
-- Name: _m2m_user_packs_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public._m2m_user_packs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public._m2m_user_packs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: _m2m_user_projects; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public._m2m_user_projects (
    id integer NOT NULL,
    users_id integer,
    projects_id integer
);


ALTER TABLE public._m2m_user_projects OWNER TO hypnowl;

--
-- Name: _m2m_user_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public._m2m_user_projects ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public._m2m_user_projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: _m2m_user_subscriptions; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public._m2m_user_subscriptions (
    id integer NOT NULL,
    users_id integer,
    subscriptions_id integer,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL
);


ALTER TABLE public._m2m_user_subscriptions OWNER TO hypnowl;

--
-- Name: _m2m_user_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public._m2m_user_subscriptions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public._m2m_user_subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: _m2m_user_tips; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public._m2m_user_tips (
    id integer NOT NULL,
    users_id integer,
    tips_id integer
);


ALTER TABLE public._m2m_user_tips OWNER TO hypnowl;

--
-- Name: _m2m_user_tips_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public._m2m_user_tips ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public._m2m_user_tips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: albums; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.albums (
    id integer NOT NULL,
    title text NOT NULL,
    image_path text,
    projects_id integer
);


ALTER TABLE public.albums OWNER TO hypnowl;

--
-- Name: albums_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.albums ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.albums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: masterclasses; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.masterclasses (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image_path text,
    video_path text
);


ALTER TABLE public.masterclasses OWNER TO hypnowl;

--
-- Name: masterclasses_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.masterclasses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.masterclasses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: message_contact; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.message_contact (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    pseudo text NOT NULL,
    user_id integer
);


ALTER TABLE public.message_contact OWNER TO hypnowl;

--
-- Name: message_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.message_contact ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.message_contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: packs; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.packs (
    id integer NOT NULL,
    title text NOT NULL,
    content text,
    price numeric(6,2) NOT NULL,
    tag text
);


ALTER TABLE public.packs OWNER TO hypnowl;

--
-- Name: packs_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.packs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.packs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image_path text,
    video_path text
);


ALTER TABLE public.projects OWNER TO hypnowl;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.projects ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: streams; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.streams (
    id integer NOT NULL,
    title text NOT NULL,
    video_path text,
    tag text
);


ALTER TABLE public.streams OWNER TO hypnowl;

--
-- Name: streams_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.streams ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.streams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    name text NOT NULL,
    price numeric(6,2) NOT NULL,
    description text
);


ALTER TABLE public.subscriptions OWNER TO hypnowl;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.subscriptions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tips; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.tips (
    id integer NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    image_path text,
    video_path text
);


ALTER TABLE public.tips OWNER TO hypnowl;

--
-- Name: tips_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.tips ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: hypnowl
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    role integer DEFAULT 1,
    email text NOT NULL,
    password text NOT NULL,
    pseudo text NOT NULL,
    isadmin boolean DEFAULT false NOT NULL,
    cart text DEFAULT '[]'::text
);


ALTER TABLE public.users OWNER TO hypnowl;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hypnowl
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: changes; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.changes (
    change_id text NOT NULL,
    script_hash text,
    change text NOT NULL,
    project text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL
);


ALTER TABLE sqitch.changes OWNER TO hypnowl;

--
-- Name: TABLE changes; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.changes IS 'Tracks the changes currently deployed to the database.';


--
-- Name: COLUMN changes.change_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.change_id IS 'Change primary key.';


--
-- Name: COLUMN changes.script_hash; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.script_hash IS 'Deploy script SHA-1 hash.';


--
-- Name: COLUMN changes.change; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.change IS 'Name of a deployed change.';


--
-- Name: COLUMN changes.project; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.project IS 'Name of the Sqitch project to which the change belongs.';


--
-- Name: COLUMN changes.note; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.note IS 'Description of the change.';


--
-- Name: COLUMN changes.committed_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.committed_at IS 'Date the change was deployed.';


--
-- Name: COLUMN changes.committer_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.committer_name IS 'Name of the user who deployed the change.';


--
-- Name: COLUMN changes.committer_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.committer_email IS 'Email address of the user who deployed the change.';


--
-- Name: COLUMN changes.planned_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.planned_at IS 'Date the change was added to the plan.';


--
-- Name: COLUMN changes.planner_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.planner_name IS 'Name of the user who planed the change.';


--
-- Name: COLUMN changes.planner_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.changes.planner_email IS 'Email address of the user who planned the change.';


--
-- Name: dependencies; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.dependencies (
    change_id text NOT NULL,
    type text NOT NULL,
    dependency text NOT NULL,
    dependency_id text,
    CONSTRAINT dependencies_check CHECK ((((type = 'require'::text) AND (dependency_id IS NOT NULL)) OR ((type = 'conflict'::text) AND (dependency_id IS NULL))))
);


ALTER TABLE sqitch.dependencies OWNER TO hypnowl;

--
-- Name: TABLE dependencies; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.dependencies IS 'Tracks the currently satisfied dependencies.';


--
-- Name: COLUMN dependencies.change_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.dependencies.change_id IS 'ID of the depending change.';


--
-- Name: COLUMN dependencies.type; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.dependencies.type IS 'Type of dependency.';


--
-- Name: COLUMN dependencies.dependency; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.dependencies.dependency IS 'Dependency name.';


--
-- Name: COLUMN dependencies.dependency_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.dependencies.dependency_id IS 'Change ID the dependency resolves to.';


--
-- Name: events; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.events (
    event text NOT NULL,
    change_id text NOT NULL,
    change text NOT NULL,
    project text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    requires text[] DEFAULT '{}'::text[] NOT NULL,
    conflicts text[] DEFAULT '{}'::text[] NOT NULL,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL,
    CONSTRAINT events_event_check CHECK ((event = ANY (ARRAY['deploy'::text, 'revert'::text, 'fail'::text, 'merge'::text])))
);


ALTER TABLE sqitch.events OWNER TO hypnowl;

--
-- Name: TABLE events; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.events IS 'Contains full history of all deployment events.';


--
-- Name: COLUMN events.event; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.event IS 'Type of event.';


--
-- Name: COLUMN events.change_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.change_id IS 'Change ID.';


--
-- Name: COLUMN events.change; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.change IS 'Change name.';


--
-- Name: COLUMN events.project; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.project IS 'Name of the Sqitch project to which the change belongs.';


--
-- Name: COLUMN events.note; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.note IS 'Description of the change.';


--
-- Name: COLUMN events.requires; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.requires IS 'Array of the names of required changes.';


--
-- Name: COLUMN events.conflicts; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.conflicts IS 'Array of the names of conflicting changes.';


--
-- Name: COLUMN events.tags; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.tags IS 'Tags associated with the change.';


--
-- Name: COLUMN events.committed_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.committed_at IS 'Date the event was committed.';


--
-- Name: COLUMN events.committer_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.committer_name IS 'Name of the user who committed the event.';


--
-- Name: COLUMN events.committer_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.committer_email IS 'Email address of the user who committed the event.';


--
-- Name: COLUMN events.planned_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.planned_at IS 'Date the event was added to the plan.';


--
-- Name: COLUMN events.planner_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.planner_name IS 'Name of the user who planed the change.';


--
-- Name: COLUMN events.planner_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.events.planner_email IS 'Email address of the user who plan planned the change.';


--
-- Name: projects; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.projects (
    project text NOT NULL,
    uri text,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    creator_name text NOT NULL,
    creator_email text NOT NULL
);


ALTER TABLE sqitch.projects OWNER TO hypnowl;

--
-- Name: TABLE projects; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.projects IS 'Sqitch projects deployed to this database.';


--
-- Name: COLUMN projects.project; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.projects.project IS 'Unique Name of a project.';


--
-- Name: COLUMN projects.uri; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.projects.uri IS 'Optional project URI';


--
-- Name: COLUMN projects.created_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.projects.created_at IS 'Date the project was added to the database.';


--
-- Name: COLUMN projects.creator_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.projects.creator_name IS 'Name of the user who added the project.';


--
-- Name: COLUMN projects.creator_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.projects.creator_email IS 'Email address of the user who added the project.';


--
-- Name: releases; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.releases (
    version real NOT NULL,
    installed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    installer_name text NOT NULL,
    installer_email text NOT NULL
);


ALTER TABLE sqitch.releases OWNER TO hypnowl;

--
-- Name: TABLE releases; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.releases IS 'Sqitch registry releases.';


--
-- Name: COLUMN releases.version; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.releases.version IS 'Version of the Sqitch registry.';


--
-- Name: COLUMN releases.installed_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.releases.installed_at IS 'Date the registry release was installed.';


--
-- Name: COLUMN releases.installer_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.releases.installer_name IS 'Name of the user who installed the registry release.';


--
-- Name: COLUMN releases.installer_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.releases.installer_email IS 'Email address of the user who installed the registry release.';


--
-- Name: tags; Type: TABLE; Schema: sqitch; Owner: hypnowl
--

CREATE TABLE sqitch.tags (
    tag_id text NOT NULL,
    tag text NOT NULL,
    project text NOT NULL,
    change_id text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL
);


ALTER TABLE sqitch.tags OWNER TO hypnowl;

--
-- Name: TABLE tags; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON TABLE sqitch.tags IS 'Tracks the tags currently applied to the database.';


--
-- Name: COLUMN tags.tag_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.tag_id IS 'Tag primary key.';


--
-- Name: COLUMN tags.tag; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.tag IS 'Project-unique tag name.';


--
-- Name: COLUMN tags.project; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.project IS 'Name of the Sqitch project to which the tag belongs.';


--
-- Name: COLUMN tags.change_id; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.change_id IS 'ID of last change deployed before the tag was applied.';


--
-- Name: COLUMN tags.note; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.note IS 'Description of the tag.';


--
-- Name: COLUMN tags.committed_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.committed_at IS 'Date the tag was applied to the database.';


--
-- Name: COLUMN tags.committer_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.committer_name IS 'Name of the user who applied the tag.';


--
-- Name: COLUMN tags.committer_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.committer_email IS 'Email address of the user who applied the tag.';


--
-- Name: COLUMN tags.planned_at; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.planned_at IS 'Date the tag was added to the plan.';


--
-- Name: COLUMN tags.planner_name; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.planner_name IS 'Name of the user who planed the tag.';


--
-- Name: COLUMN tags.planner_email; Type: COMMENT; Schema: sqitch; Owner: hypnowl
--

COMMENT ON COLUMN sqitch.tags.planner_email IS 'Email address of the user who planned the tag.';


--
-- Data for Name: _m2m_user_packs; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public._m2m_user_packs (id, users_id, packs_id) FROM stdin;
\.


--
-- Data for Name: _m2m_user_projects; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public._m2m_user_projects (id, users_id, projects_id) FROM stdin;
\.


--
-- Data for Name: _m2m_user_subscriptions; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public._m2m_user_subscriptions (id, users_id, subscriptions_id, start_time, end_time) FROM stdin;
\.


--
-- Data for Name: _m2m_user_tips; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public._m2m_user_tips (id, users_id, tips_id) FROM stdin;
\.


--
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.albums (id, title, image_path, projects_id) FROM stdin;
\.


--
-- Data for Name: masterclasses; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.masterclasses (id, title, description, image_path, video_path) FROM stdin;
\.


--
-- Data for Name: message_contact; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.message_contact (id, title, content, pseudo, user_id) FROM stdin;
\.


--
-- Data for Name: packs; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.packs (id, title, content, price, tag) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.projects (id, title, description, image_path, video_path) FROM stdin;
\.


--
-- Data for Name: streams; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.streams (id, title, video_path, tag) FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.subscriptions (id, name, price, description) FROM stdin;
\.


--
-- Data for Name: tips; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.tips (id, title, category, image_path, video_path) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hypnowl
--

COPY public.users (id, first_name, last_name, role, email, password, pseudo, isadmin, cart) FROM stdin;
\.


--
-- Data for Name: changes; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.changes (change_id, script_hash, change, project, note, committed_at, committer_name, committer_email, planned_at, planner_name, planner_email) FROM stdin;
\.


--
-- Data for Name: dependencies; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.dependencies (change_id, type, dependency, dependency_id) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.events (event, change_id, change, project, note, requires, conflicts, tags, committed_at, committer_name, committer_email, planned_at, planner_name, planner_email) FROM stdin;
fail	36abe468952662418d212cd24b93c43174650a9f	01-base-schema	hypnotic_peafowl	Schéma de base	{}	{}	{}	2021-04-21 16:01:18.129215+02	,,,	sami@DESKTOP-DCMJ0UV	2021-04-09 18:56:18+02	"Etudiant O'clock",,,	etudiant@teleporteur
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.projects (project, uri, created_at, creator_name, creator_email) FROM stdin;
hypnotic_peafowl	\N	2021-04-21 16:01:18.073024+02	,,,	sami@DESKTOP-DCMJ0UV
\.


--
-- Data for Name: releases; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.releases (version, installed_at, installer_name, installer_email) FROM stdin;
1.1	2021-04-21 16:01:18.070331+02	,,,	sami@DESKTOP-DCMJ0UV
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: sqitch; Owner: hypnowl
--

COPY sqitch.tags (tag_id, tag, project, change_id, note, committed_at, committer_name, committer_email, planned_at, planner_name, planner_email) FROM stdin;
\.


--
-- Name: _m2m_user_packs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public._m2m_user_packs_id_seq', 1, false);


--
-- Name: _m2m_user_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public._m2m_user_projects_id_seq', 1, false);


--
-- Name: _m2m_user_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public._m2m_user_subscriptions_id_seq', 1, false);


--
-- Name: _m2m_user_tips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public._m2m_user_tips_id_seq', 1, false);


--
-- Name: albums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.albums_id_seq', 1, false);


--
-- Name: masterclasses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.masterclasses_id_seq', 1, false);


--
-- Name: message_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.message_contact_id_seq', 1, false);


--
-- Name: packs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.packs_id_seq', 1, false);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.projects_id_seq', 1, false);


--
-- Name: streams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.streams_id_seq', 1, false);


--
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 1, false);


--
-- Name: tips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.tips_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hypnowl
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: _m2m_user_packs _m2m_user_packs_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_packs
    ADD CONSTRAINT _m2m_user_packs_pkey PRIMARY KEY (id);


--
-- Name: _m2m_user_projects _m2m_user_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_projects
    ADD CONSTRAINT _m2m_user_projects_pkey PRIMARY KEY (id);


--
-- Name: _m2m_user_subscriptions _m2m_user_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_subscriptions
    ADD CONSTRAINT _m2m_user_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: _m2m_user_tips _m2m_user_tips_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_tips
    ADD CONSTRAINT _m2m_user_tips_pkey PRIMARY KEY (id);


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: masterclasses masterclasses_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.masterclasses
    ADD CONSTRAINT masterclasses_pkey PRIMARY KEY (id);


--
-- Name: message_contact message_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.message_contact
    ADD CONSTRAINT message_contact_pkey PRIMARY KEY (id);


--
-- Name: packs packs_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.packs
    ADD CONSTRAINT packs_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: streams streams_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.streams
    ADD CONSTRAINT streams_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: tips tips_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.tips
    ADD CONSTRAINT tips_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: changes changes_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_pkey PRIMARY KEY (change_id);


--
-- Name: changes changes_project_script_hash_key; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_project_script_hash_key UNIQUE (project, script_hash);


--
-- Name: dependencies dependencies_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_pkey PRIMARY KEY (change_id, dependency);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (change_id, committed_at);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project);


--
-- Name: projects projects_uri_key; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.projects
    ADD CONSTRAINT projects_uri_key UNIQUE (uri);


--
-- Name: releases releases_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.releases
    ADD CONSTRAINT releases_pkey PRIMARY KEY (version);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tags tags_project_tag_key; Type: CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_project_tag_key UNIQUE (project, tag);


--
-- Name: _m2m_user_packs _m2m_user_packs_packs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_packs
    ADD CONSTRAINT _m2m_user_packs_packs_id_fkey FOREIGN KEY (packs_id) REFERENCES public.packs(id);


--
-- Name: _m2m_user_packs _m2m_user_packs_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_packs
    ADD CONSTRAINT _m2m_user_packs_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: _m2m_user_projects _m2m_user_projects_projects_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_projects
    ADD CONSTRAINT _m2m_user_projects_projects_id_fkey FOREIGN KEY (projects_id) REFERENCES public.projects(id);


--
-- Name: _m2m_user_projects _m2m_user_projects_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_projects
    ADD CONSTRAINT _m2m_user_projects_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: _m2m_user_subscriptions _m2m_user_subscriptions_subscriptions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_subscriptions
    ADD CONSTRAINT _m2m_user_subscriptions_subscriptions_id_fkey FOREIGN KEY (subscriptions_id) REFERENCES public.subscriptions(id);


--
-- Name: _m2m_user_subscriptions _m2m_user_subscriptions_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_subscriptions
    ADD CONSTRAINT _m2m_user_subscriptions_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: _m2m_user_tips _m2m_user_tips_tips_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_tips
    ADD CONSTRAINT _m2m_user_tips_tips_id_fkey FOREIGN KEY (tips_id) REFERENCES public.tips(id);


--
-- Name: _m2m_user_tips _m2m_user_tips_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public._m2m_user_tips
    ADD CONSTRAINT _m2m_user_tips_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: albums albums_projects_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_projects_id_fkey FOREIGN KEY (projects_id) REFERENCES public.projects(id);


--
-- Name: message_contact message_contact_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hypnowl
--

ALTER TABLE ONLY public.message_contact
    ADD CONSTRAINT message_contact_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: changes changes_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- Name: dependencies dependencies_change_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_change_id_fkey FOREIGN KEY (change_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dependencies dependencies_dependency_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_dependency_id_fkey FOREIGN KEY (dependency_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE;


--
-- Name: events events_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.events
    ADD CONSTRAINT events_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- Name: tags tags_change_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_change_id_fkey FOREIGN KEY (change_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE;


--
-- Name: tags tags_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: hypnowl
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

