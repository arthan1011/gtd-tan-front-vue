/**
 * Created by arthan on 18.07.2017.
 */

const passedHost = process.argv[2];
const passedPort = process.argv[3];

const PROXY_PORT = passedPort  || 8080;
const PROXY_HOST = passedHost || "backend";

const express = require('express');
const app = express();
const PORT = 4200;

const server = require('./server-config');
server(app, PORT, PROXY_HOST, PROXY_PORT);
app.use('/', express.static('dist'));