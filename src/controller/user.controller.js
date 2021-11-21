const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body;
    // 合法性 封装方法到 user.middleware 校验错误（密码或用户名是否为空，用户是否已存在）
    // // 合理性
    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.log("err", error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
    // console.log(res)
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    ctx.body = "欢迎回来" + user_name;
    try {
      // 从返回结果中剔除password属性，剩下的属性放到res对象里面
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登陆成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (error) {
      console.error("用户登录失败", error);
    }
  }
  async changePassword(ctx, next) {
    // 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    console.log(id, password);
    // 操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10107,
        message: "修改密码失败",
        result: "",
      };
    }
    // 返回结果
  }
}

module.exports = new UserController();
