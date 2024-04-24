CREATE DATABASE harry_potter_backend;
\c harry_potter_backend;

CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(255) NOT NULL,
    habilidade VARCHAR(255) NOT NULL,
    sangue VARCHAR(255) NOT NULL,
    patrono VARCHAR(255) NOT NULL,
    varinha VARCHAR(255) NOT NULL
);

INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono, varinha)
VALUES ('Harry Potter', 18, 'Grifinória', 'Bruxaria', 'Mestiço', 'Corça', 'Azevinho e pena de fênix, 11 polegadas, maleável');


CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    nucleo VARCHAR(255) NOT NULL,
    comprimento VARCHAR(255) NOT NULL,
    fabricacao INTEGER NOT NULL
);

INSERT INTO varinhas (material, nucleo, comprimento, fabricacao)
VALUES ('Carvalho', 'Pena de Fênix', '10 polegadas', 1990);
