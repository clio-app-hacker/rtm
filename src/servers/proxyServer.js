var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use(
    '/api/*',
    proxy({ target: 'http://localhost:3002' })
);

app.use(
    '/*',
    proxy({ target: 'http://localhost:3000' })
);

app.listen(3001);
