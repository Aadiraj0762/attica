const mongoose = require("mongoose");

const SuppliesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // category: {
    //   type: [
    //     {
    //       value: { type: String },
    //       label: { type: String },
    //       icon: { type: String }
    //     }
    //   ],
    //   required: false,
    // },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    products: {
      type:[
        {
        label: { type: String },
        value: { type: String }
      }
    ],
  },
},
  {
    timestamps: true,
  }
);

const Supplies = mongoose.model("Supplies", SuppliesSchema);
module.exports = Supplies;
