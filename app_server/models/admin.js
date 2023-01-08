var mongoose = require("mongoose");
var bycrypt = require("bcrypt");

var Schema = mongoose.Schema;

var adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.statics.hashPassword = (password) => {
  return bycrypt.hashSync(password, bycrypt.genSaltSync(10));
};

adminSchema.statics.comparePassword = (password, hash) => {
  return bycrypt.compareSync(password, hash);
};

module.exports = mongoose.model("Admin", adminSchema);
