var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  //Id, name, detail
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  service: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Service',
  },
});

module.exports = mongoose.model("Product", ProductSchema);
