//检测登录中间件
module.exports = (req, res, next) => {
    if (!req.session.username) { //没登录
        return res.redirect('/login'); //跳转到登录界面
    }
    next();
}
