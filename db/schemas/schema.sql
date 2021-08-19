DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

\c qa;

DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful SMALLINT DEFAULT 0
);

CREATE TABLE answers(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful SMALLINT NOT NULL DEFAULT 0,
  FOREIGN KEY(question_id) REFERENCES Questions(id)
);

CREATE TABLE photos(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  answer_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY(answer_id) REFERENCES answers(id)
);

COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/questions.csv'
DELIMITER ','
CSV HEADER;


COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/answers_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX product_id ON questions(product_id);

CREATE INDEX questions_id ON answers(question_id);

CREATE INDEX answer_id ON photos(answer_id);