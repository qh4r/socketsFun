#!/usr/bin/env forever

var http = require('http');

var getRandom = function () {
    return 1 + Math.floor(Math.random() * 100);
}

var handleHttp = function (req, res) {
    if(req.method === "GET" && req.url === "/") {
        res.writeHead(200, {"Content-type": 'text/plain'});
        res.write('siema \n!');
        res.write(getRandom().toString());
        if (getRandom() > 90) {
            console.log(';((');
            throw new Error('popsulo sie');
        }
        res.end('done');
    } else {
        res.writeHead(403);
        res.end('wrong');
    }
};

var host = 'localhost';
var port = 8000;

var http_server = http.createServer(handleHttp).listen(port, host);