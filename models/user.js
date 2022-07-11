const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

module.exports = mongoose.model("User", userSchema);
