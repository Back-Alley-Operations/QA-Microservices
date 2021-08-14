const db = require('../../db');

module.exports = {
  get: (question_id, count, callback) => {
    var queryStr = `SELECT * FROM answers WHERE question_id = ${question_id} AND reported = false LIMIT ${count};`;
    db.query(queryStr, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },

  post: ({ question_id, body, name, email }, callback) => {
    const queryString = `INSERT INTO answers
    (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES
    (${question_id}, ${body}, CURRENT_TIMESTAMP, ${name}, ${email}, false, 0);`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  helpful: (answer_id, callback) => {
    const queryString = `UPDATE questions SET helpful = helpful + 1 WHERE id = ${answer_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  report: (answer_id, callback) => {
    const queryString = `UPDATE questions SET reported = t WHERE id = ${answer_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
};