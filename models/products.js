const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

let productSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    category: { type: String },
    quantity: { type: Number },
    img: { type: String },
    was: { type: Number },
    alc: { type: Number },
  },
  {
    timestamps: true,
  }
);

var Products = mongoose.model("Product", productSchema);
module.exports = { Products, productSchema };
