#!/usr/bin/env forever

var http = require('http');
var nodeStatic = require('node-static');

var handleHttp = function (req, res) {
    if(req.method === "GET" && /^\/\d+(?=$|[\/?#])/.test(req.url)){
        req.addListener('end', function(){
            req.url = req.url.replace(/^\/(\d+).*$/,'/s$1.html');
            static_files.serve(req,res);
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
