const express = require('express');
const app = express();

app.use(require('./adn'));

module.exports = app;