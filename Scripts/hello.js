// 引入http模块(require相当于java中的import)
const http = require('http');
const querystring = require('querystring');

// 创建服务并监听8080端口(10.10.21.72是我本机的IP地址)
const sever = http.createServer((req, res) => {
    const method = req.method;    
    console.log('method', method);
    const url = req.url;
    console.log('url', url);
    req.query = querystring.parse(url.split('?')[1]);
    console.log('query', req.query);

    res.end(
        JSON.stringify(req.query)
    );
});

sever.listen(8080, (err) => {
    if (err) throw err;
    console.log("sever running at port 8080");
});
