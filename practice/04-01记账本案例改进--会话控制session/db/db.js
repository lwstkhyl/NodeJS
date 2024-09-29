/**
 * 
 * @param {*} success 数据库连接成功后执行的回调函数
 * @param {*} error 数据库连接失败后执行的回调函数
 */
module.exports = function (success, error) {
    //这样设置默认值比直接在参数中使用`=`指定更精准（防止error不是函数而报错）
    if (typeof error !== "function") error = () => console.log("连接失败");
    const { name } = require("ejs");
    const mongoose = require("mongoose");
    const { DBHOST, DBPORT, DBNAME } = require("../config/config"); //配置信息
    mongoose.set('strictQuery', false); //解除警告
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    mongoose.connection.once("open", () => success());
    mongoose.connection.on("error", () => error());
    mongoose.connection.on("close", () => console.log("连接关闭"));
}