const mongoose = require("mongoose");
const SelectedItemsSchema = new mongoose.Schema({
  item: {
    type: {
      value: { type: String },
      label: { type: String },
    },
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const ProductionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    units: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    products: {
      type: [
        {
          value: { type: String },
          label: { type: String },
        },
      ],
      required: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    variants: {
      type: [
        {
          value: { type: String },
          label: { type: String },
        },
      ],
      required: false,
    },
    selectedItems: [SelectedItemsSchema],
    selectedQuantity: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Production = mongoose.model("Production", ProductionSchema);
module.exports = Production;
