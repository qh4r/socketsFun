#!/usr/bin/env node

var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {string: "file help"});

if(args.help){
    console.log('use --file to pass arguemnts');
    process.exit(1);
}

var hello = require('./hello2');

//hello.say(args.file || '', function(err,content){
//    if(err){
//        return console.log(err.message);
//    }
//    console.log(content.toString());
//});

//hello.say(args.file || '').then(console.log);

hello.say(args.file || '').val(console.log).or(console.error);