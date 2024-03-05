const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const mongoose = require("mongoose");

// Add a Seller
const addSeller = async (req, res) => {
  try {
    const { SellerName, addressLine, area, city, state, status, pincode, gst, products,latitude,longitude } = req.body;

    const mappedProducts = products.map(product => ({
      value: product.value,
      label: product.label,
    }));

    const seller = new Seller({
      SellerName, 
      addressLine, 
      area,
      city,
      state,
      status,
      gst,
      pincode,
      latitude,
      longitude,
      products: mappedProducts
    });

    await seller.save();

    res.status(200).json({
      SellerName, 
      addressLine, 
      area,
      city,
      state,
      status,
      gst,
      pincode,
      latitude,
      longitude,
      products: mappedProducts,

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllSellers = async (req, res) => {
  try {
    const seller = await Seller.find()
      .populate({
        path: 'products',
        select: 'title -_id', // Select only the 'title' field and exclude the '_id' field
        model: 'Product' // Specify the model to use for population
      })
      .exec();

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Seller by ID
  const getSellerById = async (req, res) => {
  Seller.findById(req.params.id)
    .then(Seller => {
      if (!Seller) {
        res.status(404).json({ message: "Seller not found" });
      } else {
        res.json(Seller);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Update a Seller
const updateSeller = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Seller.findByIdAndUpdate(id, updateData, { new: true })
    .then(Seller => {
      if (!Seller) {
        res.status(404).json({ message: "Seller not found" });
      } else {
        res.json(Seller);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Delete a Seller
const deleteSeller = async (req, res) => {
  const id = req.params.id;
  Seller.findByIdAndRemove(id)
    .then(() => {
      res.json({ message: "Seller deleted successfully" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
    addSeller,
    getAllSellers,
    getSellerById,
    updateSeller,
    deleteSeller,

};
