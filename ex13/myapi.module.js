'use strict';

var url = require('url');

module.exports = function (res, apiMethods) {
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