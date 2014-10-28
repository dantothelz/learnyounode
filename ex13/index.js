'use strict';

var http = require('http');
var myAPI = require('./myapi.module.js');

var apiMethods = {
	parsetime: {
		api: function (query) {
			var d = new Date(query.iso);
			return {
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds()
			};
		},
		required_query_fields: ['iso']
	},
	unixtime: {
		api: function (query) {
			return {
				unixtime: Date.parse(query.iso)
			}
		},
		required_query_fields: ['iso']
	}
};


var server = http.createServer(function (req, res) {
	myAPI(res, apiMethods).apiRoute(req);
});

server.listen(process.argv[2]);

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var url = require('url')

    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }

    function unixtime (time) {
      return { unixtime : time.getTime() }
    }

    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result

      if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
      else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))

────────────────────────────────────────────────────────────────────────────────
*/