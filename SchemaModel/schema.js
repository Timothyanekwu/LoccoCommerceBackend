const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productFormat = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: [String],
    brand: { type: String },
    price: {
      type: Number,
      required: true,
    },
    firstTerm: { type: Number },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    clicks: {
      type: Number,
    },
  },
  { timestamps: true }
);

const cartFormat = new Schema(
  {
    qty: {
      type: Number,
    },
    price: {
      type: Number,
    },
    name: { type: String },
    img: [String],
    user_id: { type: String },
  },
  { timestamps: true }
);

const locationsFormat = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    fullAddress: {
      type: String,
      required: true,
    },
    additionalInfo: { type: String },
    phoneNo: {
      type: String,
      required: true,
    },
    additionalPhone: {
      type: String,
    },
  },
  { timestamps: true }
);

const ordersFormat = new Schema(
  {
    customerFullName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    orderNumber: { type: Number, required: true },
    // status: {type: String},
    totalPrice: { type: Number },
    payMethod: { type: String },
    user_id: {
      type: String,
      required: true,
    },
    products: [cartFormat],
  },
  { timestamps: true }
);

module.exports = {
  productFormat: mongoose.model(
    "productFormat",
    productFormat,
    "productformats"
  ),
  cartFormat: mongoose.model("cartFormat", cartFormat, "cart"),
  locationsFormat: mongoose.model(
    "locationsFormat",
    locationsFormat,
    "locations"
  ),
  ordersFormat: mongoose.model("ordersFormat", ordersFormat, "orders"),
};
