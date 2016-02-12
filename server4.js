#!/usr/bin/env forever

var http = require('http');
var nodeStatic = require('node-static');



var handleIo = function (socket) {
    socket.on('disconnect', function(){
        console.log('client disconnected');
    }).on('chat', function(data){
        socket.emit('chat', data);
        socket.broadcast.emit('chat', data);
    });
    console.log('client connected');
    process.stdin.on('data', function(chunk) {
        socket.emit('chat','message: '+chunk);
});

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

io.on('connection',handleIo);


