var express = require("express"),
	exp_had = require("express3-handlebars"),
	fortune = require("./lib/fortune.js");
	
var app = express();
var handlebars = exp_had.create({defaultLayout : "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// 添加静态资源中间件
app.use(express.static(__dirname + "/public"));

// 首页
app.get("/", function(req, res) {
//	res.type("text/plain");
//	res.send("Meadowlark Travel");
	res.render("home");
});

// 关于页面
app.get("/about", function(req, res) {
//	res.type("text/plain");
//	res.send("About Meadowlark Travel");
	res.render("about", {fortune: fortune.getFortune()});
});

// 定制404页面
app.use(function(req, res) {
//	res.type("text/plain");
	res.status(404);
//	res.send("404 - Not Fund");
	res.render("404");
});

// 定制500页面
app.use(function(err, req, res) {
	console.error(err.stack);
//	res.type("text/plain");
	res.status(500);
//	res.send("500 - Server Error");
	res.render("500");
});

// 启动web服务器
app.listen(app.get("port"), function() {
	console.log("Express started on http:localhost:" + app.get("port") + ";press Ctrl+C to terminate.")
});