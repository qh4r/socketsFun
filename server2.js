#!/usr/bin/env forever
ASQ = require('asynquence');
require('asynquence-contrib');
var http = require('http');

var getRandom = function () {
    return 1 + Math.floor(Math.random() * 100);
}

var handleHttp = function (req, res) {
    if(req.url === '/classic') {
       return setTimeout(function () {
            var x = getRandom();
            setTimeout(function () {
                var str = "Hello Old World " + x;
                setTimeout(function () {
                    res.end(str);
                }, 500)
            }, 500)
        }, 500)
    }
    return ASQ(function (done) {
        setTimeout(function () {
            var x = getRandom();
            done(x);
        }, 500);
    }).then(function (done, value) {
            setTimeout(function () {
                var str = "Hello World" + value;
                done(str);
            }, 500)
    }).val(function (result) {
        setTimeout(function () {
            res.end(result);
        }, 500);
    });
};

var host = 'localhost';
var port = 8000;

var http_server = http.createServer(handleHttp).listen(port, host);
