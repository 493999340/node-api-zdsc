const Koa = require("koa");
const KoaBody = require("koa-body");
const userRouter = require("../router/user.route");
const errHandler = require("./err.handler");
const app = new Koa();
app.use(KoaBody());
app.use(userRouter.routes());
// 统一的错误处理
app.on("error", errHandler);

module.exports = app;
