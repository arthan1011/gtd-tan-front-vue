/**
 * Created by arthan on 18.07.2017.
 */

const express = require('express');
const app = express();
const PORT = 4200;

const server = require('./server-config');
server(app, PORT);
app.use('/', express.static('dist'));