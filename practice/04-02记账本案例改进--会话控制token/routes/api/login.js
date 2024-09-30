const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel"); //导入模型
const { secret } = require("../../config/config");
const router = express.Router();
router.post('/', (req, res) => { //登录的post请求
    const { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.json({
                code: '2001',
                msg: "数据库读取失败",
                data: null
            });
            return;
        }
        if (!data) {
            res.json({
                code: '2002',
                msg: "用户名或密码错误",
                data: null
            });
            return;
        }
        //创建token
        const token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 3600 * 24 * 7 //7天
        });
        //响应token
        res.json({
            code: '0000',
            msg: "登录成功",
            data: token
        });
    });
});
module.exports = router;