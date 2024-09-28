const express = require("express");
const md5 = require("md5");
const router = express.Router();
const UserModel = require("../models/UserModel"); //导入模型
router.get('/', (req, res) => { //渲染注册页面
    res.render("auth/login");
});
router.post('/', (req, res) => { //登录的post请求
    const { username, password } = req.body;
    if (!(username && password)) {
        res.render('error', { msg: "用户名或密码不能为空", url: "/login" });
    }
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.render('error', { msg: "登录，请稍后再试", url: "/login" });
            return;
        }
        if (!data) {
            res.render('error', { msg: "账号或密码错误", url: "/login" });
            return;
        }
        //写入session
        req.session.username = data.username;
        req.session._id = data._id; //数据库中id，方便后续查询
        res.render('success', { msg: "登录成功", url: "/account" });
    });
});
module.exports = router;