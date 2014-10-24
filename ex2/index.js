'use strict';

var argv = process.argv;
var _env = argv.shift(); // 'node'
var _path = argv.shift(); // Script path

var sum = 0;
argv.forEach(function (val, index, array) {
	sum += +val;
});

console.log(sum);

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var result = 0

    for (var i = 2; i < process.argv.length; i++)
      result += Number(process.argv[i])

    console.log(result)

────────────────────────────────────────────────────────────────────────────────
*/