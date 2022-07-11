const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/glogin",
      failureFlash: "Wrong email or password.",
    }),
    users.LoginorRegister
  );

router.get("/logout", users.logout);

module.exports = router;
