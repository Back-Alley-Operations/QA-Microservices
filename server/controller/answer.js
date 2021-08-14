const models = require('../model');

module.exports = {
  get: (req, res) => {
    const { question_id } = req.params;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    models.answers.get(question_id, count, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const responseData = {
          product_id: product_id,
          page: page,
          count: count,
          results: data.rows
        }
        res.status(200).send(responseData)
      };
    });
  },

  post: (req, res) => {
    models.questions.post(req.body, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send(data);
      };
    });
  },

  helpful: (req, res) => {
    const { answer_id } = req.params;
    models.questions.post(answer_id, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send(data);
      };
    });
};