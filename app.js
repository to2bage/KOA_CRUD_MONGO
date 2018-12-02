// 首先连接数据库
require("./modules/db.js");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const artTmpl = require("koa-art-template");
const { resolve } = require("path");

const EmployeeCtrl = require("./controllers/employee/employee.js");

const app = new Koa();
const router = new Router();

artTmpl(app, {
    root: resolve(__dirname, './views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
app.use(bodyParser());

router.use("/employee", EmployeeCtrl.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8964, "127.0.0.1", () => {
    console.log("Server is Running at 127.0.0.1:8964");
})