const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: [
        {
          value: { type: String },
          label: { type: String },
          icon: { type: String }
        }
      ],
      required: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    required: false,
  }
},
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model("Purchase", purchasesSchema);
module.exports = Purchase;
