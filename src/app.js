const express = require('express');
const cors = require('cors');
const app = express();
const { port} = require('./Config');

// settings
app.set('port', port);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/items', require('./Routes/product.routes'));

module.exports = app;
