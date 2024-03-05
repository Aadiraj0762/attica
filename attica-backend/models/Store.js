const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
  },
  storeName: {
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
  landmark: {
    type: String,
    required: true,
  },
  storeOpenTime: {
    type: String,
    required: true,
  },
  storeCloseTime: {
    type: String,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "show",
    enum: ["open", "closed","active","inactive"],
  },
  manager: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  landline: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  storeImage: {
    type: Array,
    required: true,
  },
}, {
  timestamps: true,
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
