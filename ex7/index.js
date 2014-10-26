'use strict';

var http = require('http');

// var url = 'http://lk.ransoms.tk';
var url = process.argv[2];

var http_cb = function (response) {
	response.setEncoding('utf8');

	response.on('data', function (data) {
		console.log(data);
	});

	// response.on('end', function () {

	// });
};

http.get(url, http_cb);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    })

────────────────────────────────────────────────────────────────────────────────
*/