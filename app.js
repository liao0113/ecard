const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dovent = require("dotenv");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user-route");
const reviewRoutes = require("./routes/reviews-route");
const articleRoutes = require("./routes/article-route");
const { serializeUser, deserializeUser } = require("passport");

//middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//passport middleware
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(serializeUser(User.serializeUser()));
passport.use(deserializeUser(User.deserializeUser()));
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
