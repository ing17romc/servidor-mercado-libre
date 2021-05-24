const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

// settings
app.set('port', port);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/items', require('./routes/product'));

module.exports = app;
