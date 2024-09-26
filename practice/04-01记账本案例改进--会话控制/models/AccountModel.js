const mongoose = require('mongoose');
let AccountSchema = new mongoose.Schema({
    //id不用写，因为mongodb会自动生成
    title: { //标题（必填）
        type: String,
        required: true
    },
    time: { //时间（必填）
        type: Date,
        required: true
    },
    type: { //收入还是支出（必填）
        type: Number, //收入是1，支出是-1
        default: -1,  //默认是支出
        required: true
    },
    account: { //金额（必填）
        type: Number,
        required: true
    },
    remarks: String //备注
});
let AccountModel = mongoose.model('accounts', AccountSchema);
module.exports = AccountModel;