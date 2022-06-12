// 로그인 확인 라우터
// isLoggedIn 함수
// 로그인된 상태이면 다음 미들웨어로 연결
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

// isNotLoggedIn 함수
// 로그인 안된 상태이면 다음 미들웨어로 연결
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
