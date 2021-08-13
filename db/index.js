const { Pool } = require('pg');
const config = require('./config.js')

const pool = new Pool(config);

pool.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('postgres connected')
  }
});

module.exports = pool;
