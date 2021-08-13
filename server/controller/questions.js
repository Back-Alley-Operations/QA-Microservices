const models = require('../model');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.params;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    models.questions.get(product_id, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const responseData = {
          product_id: product_id,
          results: data.rows
        }
        res.status(200).send(responseData)
      };
    });
  },
}