const express = require("express");
const app = express();
const { singers } = require("./singers.json"); //导入json文件
app.get('/singer/:id.html', (req, res) => {
    const { id } = req.params; //获取路径中的id
    const singer = singers.find(item => { //在数组中根据id进行寻找
        return item.id === Number(id);
    });
    if (!singer) {
        res.statusCode = 404;
        res.end("<h1>404 not found");
        return;
    }
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h2>${singer.singer_name}</h2>
            <img src="${singer.singer_pic}">
        </body>
        </html>`);
});
app.listen(9000, () => {
    console.log("服务已经启动");
});