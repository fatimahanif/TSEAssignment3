var mongoose = require("mongoose");
var bycrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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

userSchema.statics.hashPassword = (password) => {
  return bycrypt.hashSync(password, bycrypt.genSaltSync(10));
};

userSchema.statics.comparePassword = (password, hash) => {
  return bycrypt.compareSync(password, hash);
};

module.exports = mongoose.model("User", userSchema);
