const express = require('express');
const router = express.Router();
//导入检测登录中间件
const check_login = require("../middleware/check_login");
router.get('/', check_login, function (req, res, next) {
  res.render('create');
});
module.exports = router;
