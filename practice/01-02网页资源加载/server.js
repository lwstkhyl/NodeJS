const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    const { pathname } = new URL(request.url, 'http://1.1.1.1'); //获取请求路径
    const file_path = __dirname + pathname; //请求的文件路径
    fs.readFile(file_path, (err, data) => {
        if (err) {
            response.statusCode = 500;
            response.end("文件读取失败");
            return;
        }
        response.end(data);
    })
});
server.listen(9000, () => {
    console.log("服务已经启动");
});
