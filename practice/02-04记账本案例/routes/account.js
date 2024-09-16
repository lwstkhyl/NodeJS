const express = require('express');
const router = express.Router();
//导入lowdb包
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../data/db.json");
const db = low(adapter);
//导入shortid包
const shortid = require("shortid");
//响应表单提交的post请求
router.post('/', function (req, res) {
  const id = shortid.generate(); //创建id
  db.get("accounts").unshift({ id: id, ...req.body }).write(); //添加数据
  res.render('success', { msg: "添加成功", url: "/account" }); //添加成功提醒
});
//主页面
router.get('/', function (req, res, next) {
  let accounts = db.get("accounts").value(); //获取所有的账单信息
  res.render('list', { accounts: accounts });
});
//删除数据
router.get('/:id', function (req, res) {
  const id = req.params.id; //获取id
  db.get("accounts").remove({ id: id }).write(); //删除数据
  res.render('success', { msg: "删除成功", url: "/account" }); //删除成功提醒
});
module.exports = router;
