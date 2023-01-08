var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  //Id, name, detail
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
