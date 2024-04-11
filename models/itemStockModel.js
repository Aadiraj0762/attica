const mongoose = require('mongoose');

const itemStockSchema = new mongoose.Schema({
  category: String,
  item: String,
  stockcount: Number,
  lastStock: {
    quantity: Number,
    vendor: String,
    date: Date,
  },
});

const ItemStock = mongoose.model('ItemStock', itemStockSchema);

module.exports = ItemStock;
