const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },        // Changed from 'name' to 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
});

module.exports = mongoose.model("User", UserSchema);
