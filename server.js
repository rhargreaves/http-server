var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function (req, res) {
	console.log("--------------------------- %s ----------------------------", new Date());
	console.log("%s %s", req.method, req.url);
	
	var urldata = url.parse(req.url, true);
	var headers = {'Content-type': 'text/plain', 'Cache-Control': 'no-cache, no-store'};
	printHeaders(req.headers);

	if(urldata.query.key) {
		headers["Surrogate-Key"] = urldata.query.key;
	}	
	res.writeHead(200, headers);
	res.end("Original Request URL: "+req.url);
	console.log("Response: %s", res.statusCode);
}).listen(process.env.PORT || 3000);

function printHeaders(headers) {
	for(key in headers) {
		console.log("%s: %s", key, headers[key]);
	}
}
