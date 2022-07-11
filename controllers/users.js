const User = require("../models/user");

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.LoginorRegister = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
