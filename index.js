var http = require('http');
var url = require("url");


var get_cookies = function(request) {
    var cookies = {};
    if (request.headers.cookie == null) {
        return ""
    }
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};



var instructionsNewVisitor = function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page)
    res.writeHead(200, {"Content-Type": "text/html"});
    if (page == "/"){
        res.write('<!DOCTYPE html>'+
        '<html>'+
        ' <head>'+
        ' <meta charset="utf-8" />'+
        ' <title>OnlineGames Channel</title>'+
        ' </head>'+ 
        ' <body>'+
        ' <p>Hello <strong>'+get_cookies(req)['user_id']+'</strong>!</p>'+
        ' <p>you are currently on the home page</p>'+
        ' </body>'+
        '</html>');
    } else {
        res.write('<!DOCTYPE html>'+
'<html>'+
' <head>'+
' <meta charset="utf-8" />'+
' <title>OnlineGames Channel</title>'+
' </head>'+ 
' <body>'+
' <p>Hello <strong>'+get_cookies(req)['user_id']+'</strong>!</p>'+
' <p>you are currently playing '+page.replace("/", " ")+'</p>'+
' </body>'+
'</html>');
    }
    
res.end();
    }
    
var server = http.createServer(instructionsNewVisitor);

server.listen(3000);