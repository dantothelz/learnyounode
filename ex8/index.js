'use strict';

var http = require('http');

var url = process.argv[2];

var buf = [];
var sum = 0;

var http_cb = function (response) {
	response.setEncoding('utf8');

	response.on('data', function (data) {
		buf.push(data);
		sum += data.length;
	});

	response.on('end', function () {
		console.log(sum);
		console.log(buf.join(''));
	});
};

http.get(url, http_cb);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var bl = require('bl')

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })

────────────────────────────────────────────────────────────────────────────────
*/