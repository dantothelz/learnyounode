'use strict';

var fs = require('fs');

var _env = process.argv.shift();
var _path = process.argv.shift();

var target = process.argv.shift();
var contents = fs.readFileSync(target, 'utf8');

console.log(contents.match(/\n/g).length);