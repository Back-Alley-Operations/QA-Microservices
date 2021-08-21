const express = require('express');
const db = require('../db');
const compression = require('compression');
const routes = require('./routes.js')
require('newrelic');

const app = express();
const PORT = 3000;

app.use(compression());
app.use(express.json());

app.get('/loaderio-2a529d55cc58ccf934b8d31be9591700', (req, res) => {
  res.send('loaderio-2a529d55cc58ccf934b8d31be9591700');
});

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});

app.use('/api/qa', routes);