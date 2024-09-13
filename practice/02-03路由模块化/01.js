const express = require("express");
const home_router = require("./router/home_router");
const admin_router = require("./router/admin_router");
const app = express();
app.use(home_router);
app.use(admin_router);
app.all("*", (req, res) => {
    res.send("<h3>404 not found</h3>");
});
app.listen(9000, () => {
    console.log("服务已经启动");
});