const express = require("express");
const router = express.Router();
router.post('/', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: "退出登录成功", url: "/login" });
    });
});
module.exports = router;