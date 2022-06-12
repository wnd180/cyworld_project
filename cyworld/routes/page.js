const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

const router = express.Router();
// 글 불러오는 라우터
// req.user의 사용자 데이터를 넌적스 템플릿에서 이용가능하도록 res.locals에 저장
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
});
// 전체 글 불러오기
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
//user id를 받아와 본인이 쓴 글 불러오기.
router.get("/profile/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("profile", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
