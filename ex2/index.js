'use strict';

var argv = process.argv;
var _env = argv.shift(); // 'node'
var _path = argv.shift(); // Script path

var sum = 0;
argv.forEach(function (val, index, array) {
	sum += +val;
});

console.log(sum);
