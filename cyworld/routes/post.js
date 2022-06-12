const express = require("express");
const Post = require("../models/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();
// post create update destroy 관리 라우터

//create 처리
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    console.log("Post:", post.content, post.UserId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//업데이트 처리
router.post("/update", isLoggedIn, async (req, res, next) => {
  try {
    const { id, content } = req.body;
    console.log(id, content);
    const post = await Post.update(
      {
        content: content,
      },
      { where: { id: id } }
    );
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//delete 처리
router.post("/delete", isLoggedIn, async (req, res, next) => {
  console.log("임의의 로그 입니다", req.body.id);
  try {
    const post = await Post.destroy({
      where: { id: req.body.id },
    });
    console.log("delete :", post.Postid);
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
