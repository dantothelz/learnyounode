'use strict';

var fs = require('fs');

var _env = process.argv.shift();
var _path = process.argv.shift();

var target = process.argv.shift();
var contents = fs.readFileSync(target, 'utf8');

console.log(contents.match(/\n/g).length);

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var fs = require('fs')

    var contents = fs.readFileSync(process.argv[2])
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)

    // note you can avoid the .toString() by passing 'utf8' as the
    // second argument to readFileSync, then you'll get a String!
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

────────────────────────────────────────────────────────────────────────────────
*/