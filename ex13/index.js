'use strict';

var http = require('http');
var url = require('url');

var port = process.argv[2];

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

function myAPI (res) {
	return {
		res: res,
		apiRoute: function (req) {
			if (req.method != 'GET') {
				return this.apiError(500, 'I only accept GET requests.');
			}

			var url_obj = url.parse(req.url, true);
			var method = url_obj.pathname.split('/')[2];

			if (!(method in this.methods)) {
				return this.apiError(404, 'API Endpoint not found!');
			}

			this.methods[method].required_query_fields.forEach(function (required) {
				if (!(required in url_obj.query)) {
					return this.apiError(500, 'Invalid ' + method + ' API request. Missing query field: ' + required);
				}
			});

			this.apiWriteHead(200);
			this.res.end(JSON.stringify(this.methods[method].api(url_obj.query)));
		},
		apiWriteHead: function (code) {
			this.res.writeHead(code, {'Content-Type': 'application/json'});
		},
		apiError: function (code, msg) {
			this.apiWriteHead(code);
			return this.res.end(JSON.stringify({error: msg}));
		},
		methods: apiMethods
	};
}


var server = http.createServer(function (req, res) {
	myAPI(res).apiRoute(req);
});

server.listen(port);

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