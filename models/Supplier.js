const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    supplierName: {
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
  pinCode: {
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
  // status: {
  //   type: String,
  //   default: "show",
  //   enum: ["open", "closed","active","inactive"],
  // },
  gst: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
