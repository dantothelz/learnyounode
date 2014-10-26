'use strict';

var dir_filter = require('./dir_filter.module.js');

function print_cb (err, data_array) {
	if (err !== null) {
		console.log('err', err);
		return;
	}

	data_array.forEach( function (file) {
		console.log(file);
	});
}

dir_filter(process.argv[2], process.argv[3], print_cb);

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
solution.js:

    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]

    filterFn(dir, filterStr, function (err, list) {
      if (err)
        return console.error('There was an error:', err)

      list.forEach(function (file) {
        console.log(file)
      })
    })

────────────────────────────────────────────────────────────────────────────────
*/