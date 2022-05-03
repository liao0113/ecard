const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/login").get(users.renderLogin);

router.get("/logout", users.logout);

module.exports = router;
