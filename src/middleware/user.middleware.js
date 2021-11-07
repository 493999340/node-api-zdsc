// bcrypt密码加密，抽离中间件的好处就是一旦换加密方式就直接修改中间件即可，单一职责，从逻辑上对代码进行解耦
const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExited,
  userRegisterError,
} = require("../constant/err.type");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  await next();
};
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户名已经存在", { user_name });
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.error("获取用户信息错误", error);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // 对传递过来的密码进行加密 hash保存的是密文
  const hash = bcrypt.hashSync("B4c0//", salt);
  ctx.request.body.password = hash;
  await next();
};
module.exports = { userValidator, verifyUser, cryptPassword };
