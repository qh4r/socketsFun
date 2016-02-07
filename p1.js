#!/usr/bin/env node

var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {string: "name company help"});

if(args.help) {
	console.log('use --name and --company arguments like this: --name="John"');
	process.exit(1);
}

var arg1 = process.argv[2];


console.log('hello world company:' +(args.company || '') + ' name:' +args.name);	
process.stdout.write('std out \n');
process.stderr.write('std err \n');