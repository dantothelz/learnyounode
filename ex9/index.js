'use strict';

var http = require('http');
var bl = require('bl');

var bufs = [];
var returned_count = (process.argv.length - 2);

process.argv.splice(2,3).forEach(function (url, index, arr) {
  http.get(url, function (response) {
    response.pipe(bl(function (err, data) {
      if (err !== null) {
        return console.error(err);
      }

      bufs[index] = data.toString();

      if (--returned_count == 0) {
        bufs.forEach(function (buf) {
          console.log(buf);
        });
      }
    }));
  });  
});


/*

Here's my original solution:

────────────────────────────────────────────────────────────────────────────────
'use strict';

var http = require('http');

var urls = [];

urls.push(process.argv[2]);
urls.push(process.argv[3]);
urls.push(process.argv[4]);

var returned_count = 0;

var bufs = [];


var async = function (buf_index) {

  var http_cb = function (response) {
    response.setEncoding('utf8');

    bufs[buf_index] = [];
    // bufs[buf_index] = [urls[buf_index] + ':'];

    response.on('data', function (data) {
      bufs[buf_index].push(data);
    });

    response.on('end', function () {
      returned_count++;

      if (returned_count == (process.argv.length - 2)) {
        bufs.forEach(function (buf) {
          console.log(buf.join(''));
        });
      }
    });
  };

  return http_cb;
}


urls.forEach(function (url, index, arr) {
  // console.log(url)
  http.get(url, async(index));
});

*/
/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0

    function printResults () {
      for (var i = 0; i < 3; i++)
        console.log(results[i])
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err)
            return console.error(err)

          results[index] = data.toString()
          count++

          if (count == 3) // yay! we are the last one!
            printResults()
        }))
      })
    }

    for (var i = 0; i < 3; i++)
      httpGet(i)

────────────────────────────────────────────────────────────────────────────────
*/