const db = require("./db/db"); //连接数据库
const BookModel = require('./models/BookModel'); //模型对象
const mongoose = require('mongoose');
function success() {
    BookModel.find().select({ name: 1, price: 1, _id: 0 }).sort({ price: -1, name: 1 }).limit(5).exec((err, data) => {
        if (err) {
            console.log("查询失败");
            return;
        }
        console.log("价格最高的5本书：");
        console.log(data);
    });
    // mongoose.disconnect();
}
db(success);
