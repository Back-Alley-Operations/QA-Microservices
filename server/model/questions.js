const db = require('../../db');

module.exports = {
  get: (product_id, count, page, callback) => {
    //console.log(product_id);
    var queryStr = `SELECT * FROM questions WHERE product_id = ${product_id};`;
    db.query(queryStr, (err, data) => {
      if(err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  }
}