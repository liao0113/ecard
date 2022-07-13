const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");

router.route("/register").get(users.renderRegister).post(users.Register);

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Wrong email or password.",
    }),
    users.Login
  );

router.get("/logout", users.logout);

module.exports = router;
