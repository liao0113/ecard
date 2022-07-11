const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dovent = require("dotenv");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user-route");
const reviewRoutes = require("./routes/reviews-route");
const articleRoutes = require("./routes/article-route");
require("./config/passport");

//middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionConfig = {
  name: "session",
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
//connect MongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/ecard")
    .then(() => {
      console.log("Successfully connected to mongoDB.");
    })
    .catch((e) => {
      console.log("Connection Failed.");
      console.log(e);
    });
}

//router middleware
app.use("/", userRoutes);
// app.use("/articles", articleRoutes);
// app.use("/articles/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
