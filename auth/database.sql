CREATE DATABASE mpernauth;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE auth (
    aid SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    password VARCHAR(50) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

CREATE TABLE profile (
    pid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    aid SERIAL REFERENCES auth,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar TEXT,
    github VARCHAR(50),
    cohort VARCHAR(8),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* good comments to remember for configuring your database
ALTER TABLE <table> ALTER COLUMN <column>
    TYPE <NEW DATATYBE> -- Can be used to alter the size of a VARCHAR(n)
    SET DEFAULT <default value> -- can be used to change/add the default value for FUTURE iserts
ALTER TABLE <table> ADD COLUMN <column> <type> <constraints>
*/