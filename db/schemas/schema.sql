DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

\c qa;

DROP TABLE IF EXISTS Questions, Answers, Photos;

CREATE TABLE Questions(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful SMALLINT DEFAULT 0
);

CREATE TABLE Answers(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported SMALLINT DEFAULT 0,
  helpful SMALLINT NOT NULL DEFAULT 0,
  FOREIGN KEY(question_id) REFERENCES Questions(id)
);

CREATE TABLE Photos(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  answer_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY(answer_id) REFERENCES Answers(id)
);

COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/home/sookim/136HR/SDC/server/csv/questions.csv'
DELIMITER ','
CSV HEADER;


COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/home/sookim/136HR/SDC/server/csv/answers.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(id, answer_id, url)
FROM '/home/sookim/136HR/SDC/server/csv/answers_photos.csv'
DELIMITER ','
CSV HEADER;