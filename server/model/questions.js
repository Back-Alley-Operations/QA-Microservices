const db = require('../../db');

module.exports = {
  get: (product_id, count, callback) => {
    //console.log(product_id);
    var queryStr = `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${count};`;
    db.query(queryStr, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  },

  post: ({ product_id, body, name, email }, callback) => {
    const queryString = `INSERT INTO questions
    (product_id, body, date_written, asker_name, asker_email, reported, helpful)
    VALUES
    (${product_id}, ${body}, CURRENT_TIMESTAMP, ${name}, ${email}, false, 0);`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  helpful: (question_id, callback) => {
    const queryString = `UPDATE questions SET helpful = helpful + 1 WHERE id = ${question_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  report: (question_id, callback) => {
    const queryString = `UPDATE questions SET reported = t WHERE id = ${question_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
}