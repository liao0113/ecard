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
      .then(async (email) => {
        if (!email) {
          return done(null, false);
        }
        await bycrypt.compare(password, email.password, function (err, result) {
          if (err) return done(null, false);
          if (!result) return done(null, false);
          else return done(null, email);
        });
      })
      .catch((err) => {
        return done(null, false);
      });
  })
);
