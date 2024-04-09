const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
    SellerName: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  products: 
  {
    type: [
    {
      value: { type: String },
      label: { type: String },
    }
  ],
  required: true,
},
  status: {
    type: String,
    default: "show",
    enum: ["open", "closed","active","inactive"],
  },
  gst: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number, // Assuming latitude is a number
    required: true,
  },
  longitude: {
    type: Number, // Assuming longitude is a number
    required: true,
  },
}, {
  timestamps: true,
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
