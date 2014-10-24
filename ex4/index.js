'use strict';

var fs = require('fs');

var target = process.argv[2];
fs.readFile(target, 'utf8', function (err, data) {
	console.log(data.match(/\n/g).length);
});

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var fs = require('fs')
    var file = process.argv[2]

    fs.readFile(file, function (err, contents) {
      // fs.readFile(file, 'utf8', callback) can also be used
      var lines = contents.toString().split('\n').length - 1
      console.log(lines)
    })

────────────────────────────────────────────────────────────────────────────────
*/