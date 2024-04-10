const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema(
  {
    ProductItemId: {
      type: String,
      required: false,
    },
    itemsquantity: {
      type: String,
      required: true,
    },
    items: {
      type: [
        {
          value: { type: String },
          label: { type: String },
        },
      ],
      required: false,
    },
    title: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },

    image: {
      type: Array,
      required: false,
    },
    variants: { type: String, required: true },
    // isCombination: {
    //   type: Boolean,
    //   required: false,
    // },
  },

  {
    timestamps: true,
  }
);

// module.exports = ProductItemSchema;

const ProductItem = mongoose.model("ProductItem", ProductItemSchema);
module.exports = ProductItem;
