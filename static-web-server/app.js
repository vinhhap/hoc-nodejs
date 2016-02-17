var http = require("http");
var fs = require("fs");
var url = require("url");
var hljs = require("highlight.js");
var port = process.env.PORT || "8080";
var serveFile = function(res, path) {
  var extension = path.split(".").pop();
  var isCode = false;
  var contentType;
  
  switch(extension) {
    case 'js':
        contentType = 'text/html';
        isCode = true;
        break;
    case 'html':
        contentType = 'text/html';
        isCode = true;
        break;
    case 'css':
        contentType = 'text/html';
        isCode = true;
        break;
    case 'json':
        contentType = 'text/html';
        isCode = true;
        break;
    case 'jpeg':
        contentType = 'image/jpeg';
        break;
    case 'jpg':
        contentType = 'image/jpg';
        break;
    case 'png':
        contentType = 'image/png';
        break;
    default:
        contentType = 'unknown';
        res.end();
        return;
  }
  
  res.writeHead(200, {"Content-Type": contentType});
  var stream = fs.createReadStream("." + path);
  if(isCode) {
    fs.readFile("." + path,"utf8", function(err, data) {
      if(err) return console.log(err);
      console.log(hljs.highlightAuto(data).value);
      res.end('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/default.min.css"><script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script><pre>' + hljs.highlightAuto(data).value) + '</pre>';
    });
  } else {
    stream.on("open", function() {
      stream.pipe(res);
    });
    stream.on('error', function(err) {
      console.log('Error at: .' + path);
      res.end(err);
    }); 
  }
  
};
var handleGETRequest = function(res, url_parsed) {
  var path = url_parsed.pathname;
  switch(path) {
    case "/":
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.readdir(".", function(err, files) {
        if(err) return console.log(err);
        files.forEach(function(file) {
          res.write("<a href='/" + file + "'>" + file + "</a> <br>");
        });
        res.end();
      });
      break;
    case "/tom":
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200, "json content");
      res.write('{"characters": ["Tom", "Jerry"]}');
      res.end();
      break;
    default:
      if(path.includes(".")) {
        serveFile(res, path);
      }
  }
};
var server = http.createServer();
server.on("request", function(req, res) {
  if(req.method === "GET") {
    handleGETRequest(res, url.parse(req.url, true));
  }
});
server.listen(port);
console.log("Server running at: " + port);