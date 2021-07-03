const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

let adminSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

var Admins = mongoose.model("Admin", adminSchema);
module.exports = { Admins, adminSchema };
