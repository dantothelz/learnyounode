'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (dir, ext, cb_func) {
	var data = [];

	fs.readdir(dir, function (err, list) {
		if (err !== null) {
			return cb_func(err);
		}

		list.forEach( function (file) {
			if (path.extname(file) === '.' + ext) {
				data.push(file);
			}
		});

		cb_func(null, data);
	});
};

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
solution_filter.js:

    var fs = require('fs')
    var path = require('path')

    module.exports = function (dir, filterStr, callback) {

      fs.readdir(dir, function (err, list) {
        if (err)
          return callback(err)

        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })

        callback(null, list)
      })
    }

────────────────────────────────────────────────────────────────────────────────
*/