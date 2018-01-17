var http = require("http"),
	fs = require("fs");

// 访问静态资源
function serverStatic(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	console.log(__dirname + path);
	fs.readFile(__dirname + path, function(err, data) {
		if(err) {
			res.writeHead(500, {"Content-Type" : "text/plain"});
			res.end("500 - Interal Error");
		} else {
			res.writeHead(responseCode, {"Content-Type" : contentType});
			res.end(data);
		}
	});
}

http.createServer(function(req, res) {
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path){
		case "":
			serverStatic(res, "/public/home.html", "text/html");
			break;
		case "/about":
			serverStatic(res, "/public/about.html", "text/html");
			break;
		case "/img/logo.jpg":
			serverStatic(res, "/public/img/logo.jpg", "image/jpeg");
			break;
		default:
			serverStatic(res, "/public/404.html", "text/html", 404);
			break;
	}
}).listen(3000)

console.log("Server started on localhost:3000; press Ctrl-C to terminate……");