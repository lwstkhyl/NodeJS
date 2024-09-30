const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
module.exports = (req, res, next) => {
    //获取token
    const token = req.get('token');
    if (!token) {
        res.json({
            code: "2003",
            msg: 'token缺失',
            data: null
        });
        return;
    }
    //校验token
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.json({
                code: "2004",
                msg: 'token校验失败',
                data: null
            });
            return;
        }
        //保存用户信息
        req.user = data;
        //校验成功，继续执行代码
        next();
    });
}