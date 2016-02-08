var fs = require('fs'),
    ASQ = require('asynquence');
require('asynquence-contrib');


var readFile = function readFile(filename){
    return ASQ(function(done){
        var stream = fs.createReadStream(filename);
        var output = "";
        stream.pipe(fs.createWriteStream(filename.replace(/(.*)(\..*)/,'$1_backup$2')));
        stream.on('data', function(data){
            output += data;
        }).on('end', function(){
            done(output);
        })
    });
};

var delayMessage = function(done, contents){
    setTimeout(function(){
        done(contents.toString());
    },1000)
}

var say = function(fileName){
    return readFile(fileName).then(delayMessage);
}

module.exports.readFile = readFile;
module.exports.say = say;