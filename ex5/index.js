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