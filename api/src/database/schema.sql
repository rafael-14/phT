CREATE DATABASE pophaus;

CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY NOT NULL,
    data TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    unidade VARCHAR (20) NOT NULL,
    duracao INTEGER NOT NULL
);