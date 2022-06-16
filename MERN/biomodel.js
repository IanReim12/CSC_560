//bioModel.js
var mongoose = require("mongoose");
//schema
var bioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
// Export Bio Model
var bio = (module.exports = mongoose.model("bio", bioSchema));
module.exports.get = function (callback, limit) {
  bio.find(callback).limit(limit);
};
