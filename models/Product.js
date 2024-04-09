const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    unitofmeasurement: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
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
    stock: {
      type: String,
      required: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    sales: {
      type: Number,
      required: false,
    },

    tag: [String],
    prices: {
      originalPrice: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     productId: { type: String, required: false },
//     unitofmeasurement: { type: String, required: false },
//     sku: { type: String, required: false },
//     title: { type: Object, required: true },
//     description: { type: Object, required: false },
//     image: { type: Array, required: false },
//     stock: { type: String, required: false },
//     categories: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category",
//         required: false,
//       },
//     ],
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: false,
//     },
//     sales: { type: Number, required: false },
//     tag: [String], // Added 'tag' field
//     prices: {
//       originalPrice: { type: Number, required: true },
//       price: { type: Number, required: true },
//       discount: { type: Number, required: false },
//     },
//     items: [{ item: { type: String , required: true }, quantity: { type: Number } }], // Added 'items' field
//     variants: [{}],
//     isCombination: { type: Boolean, required: true },
//     status: { type: String, default: "show", enum: ["show", "hide"] },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
