// load config
const result = require('dotenv').config();
if (result.error) {
  throw result.error
}

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// middleware
const morgan = require('morgan')
app.use(morgan('combined'))

// controllers for routes
const materials = require('./controllers/materialsController');
app.use('/material', materials);

const port = process.env.PORT;
console.log('App listening on port : ' + port);
app.listen(port);