var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200

    var string = fs.readFileSync("./index.html", "utf-8");
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    // response.write('<!DOCTYPE>\n<html>' +
    //   '<head><link rel="stylesheet" href="/style.css">' +
    //   '</head><body>' +
    //   '<h1>你好</h1>' +
    //   '<script src="/main.js"></script>' +
    //   '</body></html>')
    response.end(string);
  } else if (path === "/index2.html") {
    response.statusCode = 200;
    var string = fs.readFileSync("./index2.html", "utf-8");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.end(string);
  } else if (path === "/index3.html") {
    response.statusCode = 200;
    var string = fs.readFileSync("./index3.html", "utf-8");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.end(string);
  } else if (path === "/style.css") {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  } else if (path == "/main.js") {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("这是JS执行的")')
    response.end()
  } else if (path == "/ffyjq.js") {
    response.statusCode = 200;
    var string = fs.readFileSync("./ffyjq.js", "utf-8");
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.end(string);
  } else if (path == "/pay") {
    var num = fs.readFileSync("./money", "utf-8");
    num = num - 1;
    fs.writeFileSync("./money", num);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    var data = {
      "code": 1,
      "data": num
    };
    response.write(`${query.cbk}.call(undefined,${JSON.stringify(data)});`);
    response.end();
  } else if (path === "/yyy") {
    response.statusCode = 200;
    response.setHeader("Content-type", "text/json;charset=utf-8");
    // 允许http://frank.com:8001请求我
    response.setHeader("Access-Control-Allow-Origin", "http://frank.com:8001");
    response.write(`
      "note":{
        "to":"ffy",
        "from":"111"
      }
    `);
    response.end();
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('页面丢失了')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)