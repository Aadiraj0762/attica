const Supplies = require('../models/Supplies');
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Category = require("../models/Category");
// Create a new Supplies

const createSupplies = async (req, res) => {
  try {
    const { title, category, quantity, price, products } = req.body;

    // const formattedCategory = category.map(cat => ({
    //   value: cat.value,
    //   label: cat.label,
    //   icon: cat.icon
    // }));

    const mappedProducts = products.map(product => ({
    //   id: product.id,
    //   title: product.title
      value: product.value,
      label: product.label,
    }));

    const supplies = new Supplies({
      title,
    //   category: formattedCategory,
      quantity,
      price,
      products: mappedProducts
    });

    await supplies.save();

    res.status(200).json({
    //   category: formattedCategory,
      price,
      products: mappedProducts,
      quantity,
      title
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all Supplies

const getAllSupplies = async (req, res) => {
  try {
    const supplies = await Supplies.find()
      .populate({
        path: 'products',
        select: 'title -_id', // Select only the 'title' field and exclude the '_id' field
        model: 'Product' // Specify the model to use for population
      })
      .exec();

    res.status(200).json(supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a Supplies by ID
const getSuppliesById = async (req, res) => {
  const { id } = req.params;
  try {
    const Supplies = await Supplies.findById(id);
    if (!Supplies) {
      return res.status(404).json({ message: 'Supplies not found' });
    }
    res.status(200).json(Supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Supplies by ID
const updateSupplies = async (req, res) => {
  const { id } = req.params;
  try {
    const Supplies = await Supplies.findByIdAndUpdate(id, req.body, { new: true });
    if (!Supplies) {
      return res.status(404).json({ message: 'Supplies not found' });
    }
    res.status(200).json(Supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Supplies by ID
const deleteSupplies = async (req, res) => {
  const { id } = req.params;
  try {
    const supplies = await Supplies.findByIdAndDelete(id);
    if (!supplies) {
      return res.status(404).json({ message: 'Supplies not found' });
    }
    res.status(200).json({ message: 'Supplies deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSupplies,
  getAllSupplies,
  getSuppliesById,
  updateSupplies,
  deleteSupplies,
};
