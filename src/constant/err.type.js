module.exports = {
  // 用户模块10XXX
  userFormatError: {
    code: "10001",
    message: "密码或用户名为空",
    result: "",
  },
  userAlreadyExited: {
    code: "10002",
    message: "用户已存在",
    result: "",
  },
  userRegisterError: {
    code: "10003",
    message: "用户注册错误",
    result: "",
  },
  userDoesNotExist: {
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  userLoginError: {
    code: "10005",
    message: "用户登录失败",
    result: "",
  },
  invalidPassword: {
    code: "10006",
    message: "用户密码错误",
    result: "",
  },
  // 授权模块 101XXX
  tokenExpiredError: {
    code: "10101",
    message: "token 已过期",
    result: "",
  },
  invalidToken: {
    code: "10102",
    message: "无效的token",
    result: "",
  },
};
