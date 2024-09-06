const http = require('http');
const fs = require('fs');
const path = require('path');
const mimes = { //一个字典，键是后缀，值是对应的mime
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
};
const server = http.createServer((request, response) => {
    if (request.method !== 'GET') { //请求类型错误
        request.statusCode = 405;
        response.end('<h1>405 Method Not Allowed</h1>');
        return;
    }
    const { pathname } = new URL(request.url, 'http://1.1.1.1'); //获取请求路径
    const root = __dirname + '/page'; //网页根目录
    const file_path = root + pathname; //请求的文件路径
    fs.readFile(file_path, (err, data) => {
        if (err) {
            response.setHeader('content-type', 'text/html;charset=utf-8');
            switch (err.code) { //错误类型判断
                case "ENOENT":
                    response.statusCode = 404;
                    response.end('<h1>404 Not Found</h1>');
                    break;
                case "EPERM":
                    response.statusCode = 403;
                    response.end('<h1>403 Forbidden</h1>');
                    break;
                default:
                    response.statusCode = 500;
                    response.end('<h1>Internal Server Error</h1>');
                    break;
            }
            return;
        }
        const ext = path.extname(file_path).slice(1); //后缀名（去掉前面的.）
        const mime = mimes[ext]; //获取对应的mime
        if (mime) { //获取到了mime
            if (ext === 'html') { //如果是HTML，加上charset
                response.setHeader('content-type', mime + ';charset=utf-8');
            } else { //其它格式不用加
                response.setHeader('content-type', mime);
            }
        } else { //没获取到，设为application/octet-stream
            response.setHeader('content-type', 'application/octet-stream');
        }
        response.end(data);
    })
});
server.listen(9000, () => {
    console.log("服务已经启动");
});
