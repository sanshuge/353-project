'use strict';
const PORT = 3000;
const HOST = "0.0.0.0";
var express = require('express'); var app = express();
app.get('/', (req, resp) => { console.log(req.originalUrl); resp.send('hello world'); });
app.get('/hello', (req, resp) => { console.log(req.originalUrl); resp.send('hello'); });
app.use('/web', express.static('pages'));
app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);

