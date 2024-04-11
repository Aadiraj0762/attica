// const mongoose = require("mongoose");

// const ProductItemSchema = new mongoose.Schema(
//   {
//     ProductItemId: {
//       type: String,
//       required: false,
//     },
//     // itemsquantity: [
//     //   {
//     //     type: String,
//     //     required: true,
//     //   },
//     // ],
        
//     selectedItems: [
//       {
//           item: { type: mongoose.Schema.Types.ObjectId, ref: "ProductItem" },
//           quantity: { type: Number, default: 0 }
//       }
//   ],
//   selectedQuantity: {
//       type: Number,
//       default: 0
//   },
//     items: {
//       type: [
//         {
//           value: { type: String },
//           label: { type: String },
//         },
//       ],
//       required: false,
//     },
//     title: {
//       type: Object,
//       required: true,
//     },
//     description: {
//       type: Object,
//       required: false,
//     },

//     image: {
//       type: Array,
//       required: false,
//     },
//     variants: { type: String, required: true },
//   },

//   {
//     timestamps: true,
//   }
// );

// // module.exports = ProductItemSchema;

// const ProductItem = mongoose.model("ProductItem", ProductItemSchema);
// module.exports = ProductItem;
const mongoose = require("mongoose");

// const SelectedItemsSchema = new mongoose.Schema({
//     item: {
//         type: {
//             value: { type: String },
//             label: { type: String }
//         },
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// });

const ProductItemSchema = new mongoose.Schema({

    itemsquantity: [{
        type: String,
        required: true,
    }],

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    variants: {
        type: String,
        required: true
    },
    // selectedItems: [SelectedItemsSchema],
    // selectedQuantity: {
    //     type: Number,
    //     default: 0
    // }
},
{
    timestamps: true
});

const ProductItem = mongoose.model("ProductItem", ProductItemSchema);
module.exports = ProductItem;
