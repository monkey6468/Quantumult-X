// 引入http模块(require相当于java中的import)
var http = require('http');

// 创建服务并监听8080端口(10.10.21.72是我本机的IP地址)
var app = http.createServer(function(req,res){
    // 设置响应头
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    // 响应的内容部分
    res.end('My first nodejs application!');
}).listen(8080,'localhost');
