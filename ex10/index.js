'use strict';

var net = require('net');

var port = process.argv[2];

var server = net.createServer(function (socket) {
	var d = new Date();
	var YYYY = d.getFullYear();
	var MM = d.getMonth() + 1;
	var DD = d.getDate();
	var hh = d.getHours();
	var mm = d.getMinutes();

	MM = (MM <= 9) ? '0' + MM : MM;
	DD = (DD <= 9) ? '0' + DD : DD;
	hh = (hh <= 9) ? '0' + hh : hh;
	mm = (mm <= 9) ? '0' + mm : mm;

	socket.end(YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + "\n");
});

server.listen(port);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var net = require('net')

    function zeroFill(i) {
      return (i < 10 ? '0' : '') + i
    }

    function now () {
      var d = new Date()
      return d.getFullYear() + '-'
        + zeroFill(d.getMonth() + 1) + '-'
        + zeroFill(d.getDate()) + ' '
        + zeroFill(d.getHours()) + ':'
        + zeroFill(d.getMinutes())
    }

    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })

    server.listen(Number(process.argv[2]))

────────────────────────────────────────────────────────────────────────────────
*/