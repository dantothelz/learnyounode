'use strict';

var fs = require('fs');

var target = process.argv[2];
var extension = process.argv[3];
fs.readdir(target, function (err, list) {
	list.forEach(function(v, k, a) {
		if (v.match(new RegExp("\." + extension + "$"))) {
			console.log(v);
		}
	});
});

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var fs = require('fs')
    var path = require('path')

    fs.readdir(process.argv[2], function (err, list) {
      list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3])
          console.log(file)
      })
    })

────────────────────────────────────────────────────────────────────────────────
*/