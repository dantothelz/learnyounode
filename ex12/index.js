'use strict';

var http = require('http');
var map = require('through2-map');

var port = process.argv[2];

var server = http.createServer(function (req, res) {
	if (req.method != 'POST') {
		return res.end("I only accept POST requests.\n");
	}

	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res);
});

server.listen(port);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var map = require('through2-map')

    var server = http.createServer(function (req, res) {
      if (req.method != 'POST')
        return res.end('send me a POST\n')

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))

────────────────────────────────────────────────────────────────────────────────
*/