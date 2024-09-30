const express = require('express');
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
const check_token = require("../../middleware/check_token");
const router = express.Router();
router.post('/', check_token, function (req, res) {
    AccountModel.create({
        ...req.body, //先把全部属性放入
        time: moment(req.body.time).toDate() //再修改time属性（自动覆盖）
    }, (err, data) => {
        if (err) {
            res.json({
                code: "1001",
                msg: '创建失败',
                data: null
            });
            return;
        }
        res.json({
            code: "0000",
            msg: '创建成功',
            data: data
        });
    });
});
//主页面
router.get('/', check_token, function (req, res) {
    console.log(req.user);
    AccountModel.find().sort({ time: -1 }).exec((err, data) => { //按时间倒序（新的在上面）
        if (err) {
            res.json({
                code: "1002",
                msg: '读取失败',
                data: null
            });
            return;
        }
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        });
    });
});
//删除数据
router.delete('/:id', check_token, function (req, res) {
    const id = req.params.id; //获取id
    AccountModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                code: "1003",
                msg: '删除失败',
                data: null
            });
            return;
        }
        res.json({
            code: "0000",
            msg: '删除成功',
            data: null
        });
    });
});
//获取单个账单信息
router.get('/:id', check_token, function (req, res) {
    let { id } = req.params;
    AccountModel.findById(id, (err, data) => {
        if (err) {
            res.json({
                code: "1004",
                msg: '读取单个账单失败',
                data: null
            });
            return;
        }
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        });
    });
});
//更新单个账单信息
router.patch('/:id', check_token, function (req, res) {
    let { id } = req.params;
    AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            res.json({
                code: "1005",
                msg: '更新账单失败',
                data: null
            });
            return;
        }
        //要求返回更新后的结果：再查询一次
        AccountModel.findById(id, (err, data) => {
            if (err) {
                res.json({
                    code: "1004",
                    msg: '读取单个账单失败',
                    data: null
                });
                return;
            }
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data
            });
        });
    });
});
module.exports = router;
