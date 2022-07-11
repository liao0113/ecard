const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bycrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  console.log("Serializing user now");
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  console.log("Deserializing user now");
  User.findById({ _id }).then((user) => {
    console.log("Found user");
    done(null, user);
  });
});

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email })
      .then((email) => {
        if (!email) {
          return done(null, false);
        }
        // if (!email) {
        //   const user = new User({ email: this.email, password: this.password });
        //   const newUser = await user.save();
        //   return done(null, newUser);
        // }
        // await bycrypt.compare(password, email.password, function (err, result) {
        //   if (err) done(null, false);
        //   if (!result) done(null, false);
        // });
        return done(null, email);
      })
      .catch((err) => {
        return done(null, false);
      });
  })
);
