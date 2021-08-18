const db = require('../../db');

module.exports = {
  get: (product_id, count, callback) => {
    // var queryStr = `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${count};`;
    // var queryStr = `SELECT * FROM questions AS q
    //                 INNER JOIN answers AS a
    //                 ON q.id = a.question_id
    //                 WHERE q.product_id = ${product_id} AND q.reported = false LIMIT ${count};`;
    var queryStr = `SELECT json_build_object(
      'results', ( SELECT json_agg(json_build_object(
        'product_id', q.product_id,
        'question_body', q.body,
        'question_date', q.date_written,
        'asker_name', q.asker_name,
        'question_helpfulness', q.helpful,
        'reported', q.reported,
        'answers', ( SELECT json_agg(json_build_object(
          'answer_id', a.id,
          'body', a.body,
          'date', a.date_written,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpful,
          'photos', ( SELECT json_agg(json_build_object(
            'id', p.id,
            'url', p.url
          )) FROM photos p WHERE p.answer_id = a.id)
        )) FROM answers a WHERE q.id = a.question_id)
      )) FROM questions q WHERE product_id = ${product_id} AND q.reported = false LIMIT ${count})
    );`

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