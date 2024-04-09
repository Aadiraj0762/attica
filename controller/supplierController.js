const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");
const mongoose = require("mongoose");

// Add a Supplier
const addSupplier = async (req, res) => {
  try {
    const { supplierName, addressLine, area, city, state, status, pinCode, gst, products } = req.body;

    const mappedProducts = products.map(product => ({
      value: product.value,
      label: product.label,
    }));

    const supplier = new Supplier({
      supplierName, 
      addressLine, 
      area,
      city,
      state,
      status,
      gst,
      pinCode,
      products: mappedProducts
    });

    await supplier.save();

    res.status(200).json({
      supplierName, 
      addressLine, 
      area,
      city,
      state,
      status,
      gst,
      pinCode,
      products: mappedProducts
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllSuppliers = async (req, res) => {
  try {
    const supplier = await Supplier.find()
      .populate({
        path: 'products',
        select: 'title -_id', // Select only the 'title' field and exclude the '_id' field
        model: 'Product' // Specify the model to use for population
      })
      .exec();

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Supplier by ID
  const getSupplierById = async (req, res) => {
  Supplier.findById(req.params.id)
    .then(Supplier => {
      if (!Supplier) {
        res.status(404).json({ message: "Supplier not found" });
      } else {
        res.json(Supplier);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Update a Supplier
const updateSupplier = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Supplier.findByIdAndUpdate(id, updateData, { new: true })
    .then(Supplier => {
      if (!Supplier) {
        res.status(404).json({ message: "Supplier not found" });
      } else {
        res.json(Supplier);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Delete a Supplier
const deleteSupplier = async (req, res) => {
  const id = req.params.id;
  Supplier.findByIdAndRemove(id)
    .then(() => {
      res.json({ message: "Supplier deleted successfully" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
    addSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,

};
