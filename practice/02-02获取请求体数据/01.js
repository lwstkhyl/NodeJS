const express = require("express");
const body_parser = require("body-parser");
const app = express();
const json_parser = body_parser.json();
const urlencoded_parser = body_parser.urlencoded({ extended: false });
app.get('/login', (req, res) => { //get--响应HTML文件
    res.sendFile(__dirname + "/form.html");
});
app.post('/login', urlencoded_parser, (req, res) => { //post--输出用户名和密码
    const { username, password } = req.body;
    res.send(`<h3>用户名：${username}</h3><h3>密码：${password}</h3>`)
});
app.listen(9000, () => {
    console.log("服务已经启动");
});