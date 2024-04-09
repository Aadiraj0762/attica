// Require necessary modules
const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');
const Seller = require('../models/sellerModel');
const RawMaterials = require('../models/rawMaterialsModel');
const Products = require('../models/productsModel');

// API endpoint to get total document count for each model
router.get('/dashboard', async (req, res) => {
  try {
    const supplierCount = await Supplier.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const rawMaterialsCount = await RawMaterials.countDocuments();
    const productsCount = await Products.countDocuments();

    const totalCounts = {
      suppliers: supplierCount,
      sellers: sellerCount,
      rawMaterials: rawMaterialsCount,
      products: productsCount,
    };

    res.status(200).json(totalCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
