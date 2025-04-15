const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);;
