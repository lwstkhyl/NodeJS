const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((request, response) => {
    const file_path = path.resolve(__dirname, 'table.html'); //html文件绝对路径
    const content = fs.readFileSync(file_path); //读取内容
    response.setHeader('content-type', 'text/html;charset=utf-8'); //设置字符集
    response.end(content); //写入
});
server.listen(9000, () => {
    console.log("服务已经启动");
});
