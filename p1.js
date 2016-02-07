#!/usr/bin/env node

var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {string: "name company"});

var arg1 = process.argv[2];


console.log('hello world company:' +(args.company || '') + ' name:' +args.name);	
process.stdout.write('std out \n');
process.stderr.write('std err \n');