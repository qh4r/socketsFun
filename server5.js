#!/usr/bin/env forever

var http = require('http');
var nodeStatic = require('node-static');
var colors = ['red', 'blue', 'green', 'yellow', 'cyan', 'brown', 'purple', 'pink', 'black'];
var handleIo = function (socket) {
    if(colors.length) {
        var random = Math.floor(Math.random() * colors.length);
        var socketColor = colors[random];
        colors.splice(random, 1);
        socket.on('disconnect', function () {
            colors.push(socketColor);
            socket.broadcast.emit('remove',socketColor);
            delete socketColor;
            console.log('client disconnected');
        }).on('movement', function (data) {
            //io.broadcast sle tez do tego kto wyslal
            data.color = socketColor;
            socket.broadcast.emit('spy', data);
        });
        console.log('client connected');
    }
}


var handleHttp = function (req, res) {
    if (req.method === "GET" && /^\/\d+(?=$|[\/?#])/.test(req.url)) {
        req.addListener('end', function () {
            req.url = req.url.replace(/^\/(\d+).*$/, '/s$1.html');
            static_files.serve(req, res);
        });
        req.resume();
    } else {
        res.writeHead(403);
        res.end('wrong');
    }
};

var host = 'localhost';
var port = 8000;

var static_files = new nodeStatic.Server(__dirname);

var http_server = http.createServer(handleHttp).listen(port, host);

var io = require('socket.io').listen(http_server);

io.on('connection', handleIo);


