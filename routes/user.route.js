const express = require("express");
const router = express.Router();
const auth = require("../controller/auth.controller");
const passport = require("passport");
const jwt = require("jsonwebtoken");

let BASE_URL = "https://ceddit-one.vercel.app";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3000";
}

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    scope: ["email", "profile"],
    session: false,
  }),
  function (req, res) {
    const token = jwt.sign(buildToken(req.user), process.env.TOKEN_KEY);
    if (req.query.origin) {
      res.redirect(
        `${BASE_URL}/#user=${JSON.stringify({
          token,
          username: req.user.username,
          userId: req.user._id,
          isAdmin: req.user.isAdmin,
          user: req.user,
        })}`
      );
    } else {
      res.redirect(
        `${BASE_URL}/#user=${JSON.stringify({
          token,
          username: req.user.username,
          userId: req.user._id,
          isAdmin: req.user.isAdmin,
          user: req.user,
        })}`
      );
    }
  }
);

module.exports = router;
