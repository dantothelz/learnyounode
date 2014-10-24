'use strict';

var fs = require('fs');

var target = process.argv[2];
fs.readFile(target, 'utf8', function (err, data) {
	console.log(data.match(/\n/g).length);
});