const User = require("../models/user");

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.Register = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    req.flash("error", "Email has already been registered");
    res.redirect("/register");
  }
  try {
    const user = new User({ email, password });
    const saveUser = await user.save();
    req.logIn(saveUser, (err) => {
      if (err) return next();
      req.flash("success", "Welcome ecard");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.Login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Goodbye");
  res.redirect("/");
};
