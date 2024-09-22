const express = require('express');
const router = express.Router();
//导入shortid包
const shortid = require("shortid");
//导入moment包
const moment = require("moment");
//导入模型文件
const AccountModel = require("../../models/AccountModel");
//响应表单提交的post请求
router.post('/', function (req, res) {
  AccountModel.create({
    ...req.body, //先把全部属性放入
    time: moment(req.body.time).toDate() //再修改time属性（自动覆盖）
  }, (err, data) => {
    if (err) {
      console.log(err);
      res.render('error', { msg: "添加失败", url: "/create" }); //添加失败提醒
      res.status(500);
      return;
    }
    res.render('success', { msg: "添加成功", url: "/account" }); //添加成功提醒
  });
});
//主页面
router.get('/', function (req, res) {
  AccountModel.find().sort({ time: -1 }).exec((err, data) => { //按时间倒序（新的在上面）
    if (err) {
      res.render('error', { msg: "读取失败", url: "/account" }); //读取失败提醒
      res.status(500);
      return;
    }
    res.render('list', { accounts: data, moment: moment }); //渲染页面
  });
});
//删除数据
router.get('/:id', function (req, res) {
  const id = req.params.id; //获取id
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.render('error', { msg: "删除失败", url: "/account" }); //删除失败提醒
      res.status(500);
      return;
    }
    res.render('success', { msg: "删除成功", url: "/account" }); //删除成功提醒
  });
});
module.exports = router;
