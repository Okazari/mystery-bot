const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/', express.static(path.join(__dirname, '../public')));

module.exports = app
