const Production = require("../models/Production");
const axios = require("axios"); // Import the axios library at the top of the file

const getProductions = async (req, res) => {
  try {
    const productions = await Production.find();
    res.status(200).json(productions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduction = async (req, res) => {
    try {
      // Fetch products from a separate model/API here using axios
      const productsResponse = await axios.get("http://127.0.0.1:5055/api/productItem/");
      const products = productsResponse.data;
  
      // Create Production instance by merging the fetched products with the request body
      const newProduction = new Production({ ...req.body, products });
  
      const savedProduction = await newProduction.save();
      res.status(201).json(savedProduction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (production) {
      res.status(200).json(production);
    } else {
      res.status(404).json({ message: "Production not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduction = async (req, res) => {
  try {
    const updatedProduction = await Production.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduction = async (req, res) => {
  try {
    await Production.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProductions,
  createProduction,
  getProductionById,
  updateProduction,
  deleteProduction,
};
