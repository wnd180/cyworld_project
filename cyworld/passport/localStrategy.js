const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
//로컬 로그인
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    console.info("___new LocalStrategy()");
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        }
      } else {
        done(null, false, { message: "가입되지 않은 회원입니다." });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);
