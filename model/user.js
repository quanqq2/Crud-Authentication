const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    FacebookId:{type: String},
    googleId: {type:String},
  username: {type: String, required: true},
  email: {type: String},
  password: {type: String},}
);
const User = mongoose.model('User', userSchema);
module.exports = User;
