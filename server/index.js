const express = require('express');
const db = require('../db');
//const compression = require('compression');
const routes = require('./routes.js')

const app = express();
const PORT = 3000;

//app.use(compression);
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});

app.use('/api/qa', routes);