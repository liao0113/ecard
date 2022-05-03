const User = require("../models/user");

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.LoginorRegister = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
  }
  const newUser = new User({ email, password });
  const registeredUser = await newUser.register(email, password);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
