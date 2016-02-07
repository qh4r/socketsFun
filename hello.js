var fs = require('fs'),
    ASQ = require('asynquence');
require('asynquence-contrib');


var readFile = function readFile(filename, cb){
    //var contents = fs.readFileSync(filename);

    //return fs.readFile(filename, function(err, result){
    //    if(err){
    //        return cb(err);
    //    }
    //    setTimeout(function(){
    //        cb(null, result);
    //    }, 1000);
    //});
    var sequence = ASQ();

    fs.readFile(filename, sequence.errfcb());

    return sequence;
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