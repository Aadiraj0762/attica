const Purchases = require('../models/Purchases');
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Category = require("../models/Category");

const createPurchase = async (req, res) => {
  try {
    const { title, category, quantity, price, products } = req.body;

    let formattedCategory = category;
    if (Array.isArray(category)) {
      formattedCategory = category.map(cat => ({
        value: cat.value,
        label: cat.label,
        icon: cat.icon
      }));
    }

    const mappedProducts = products.map(product => ({
      // id: product.id,
      // title: product.title
      value: product.value,
      label: product.label,
    }));

    const purchases = new Purchases({
      title,
      category: formattedCategory,
      quantity,
      price,
      products: mappedProducts
    });

    await purchases.save();

    res.status(201).json({
      category: formattedCategory,
      price,
      products: mappedProducts,
      quantity,
      title
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all purchases

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchases.find()
      .populate({
        path: 'products',
        select: 'title -_id', // Select only the 'title' field and exclude the '_id' field
        model: 'Product' // Specify the model to use for population
      })
      .exec();

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a purchase by ID
const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchases.findById(id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a purchase by ID
const updatePurchase = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchases.findByIdAndUpdate(id, req.body, { new: true });
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a purchase by ID
const deletePurchase = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchases.findByIdAndDelete(id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
};
