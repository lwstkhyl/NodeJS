const express = require("express");
const md5 = require("md5");
const router = express.Router();
const UserModel = require("../../models/UserModel"); //导入模型
router.get('/', (req, res) => { //渲染注册页面
    res.render("auth/reg");
});
router.post('/', (req, res) => { //登录的post请求
    const { username, password } = req.body;
    if (!(username && password)) {
        res.render('error', { msg: "注册失败", url: "/reg" });
    }
    const md5_pw = md5(password);
    UserModel.create({ username: username, password: md5_pw }, (err, data) => {
        if (err) {
            res.render('error', { msg: "注册失败", url: "/reg" });
            return;
        }
        res.render('success', { msg: "注册成功", url: "/login" });
    });
});
module.exports = router;