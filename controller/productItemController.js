const ProductItem = require('../models/ProductItem');
const Items =require('../models/Items');
// Create a new ProductItem
const createProductItem = async (req, res) => {
  try {
    const productItem = new ProductItem(req.body);
    const newProductItem = await productItem.save();
    res.status(201).json(newProductItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// const createProductItem = async (req, res) => {
//   try {
//     // Extract the necessary data from the request body
//     const { title, description, image, variants, items } = req.body;

//     if (!title || !variants || !items || items.length === 0) {
//       return res.status(400).json({ message: "Title, variants, and items are required fields." });
//     }

//     // Create an array to store the items with their quantities
//     const products = items.map(item => ({
//       value: item.productId, // Assuming productId is used to identify the item
//       label: item.quantity, // Using quantity as the label for the item
//     }));

//     // Create the new ProductItem instance
//     const ProductItem = new ProductItem({
//       title,
//       description,
//       image,
//       variants,
//       products, // Assign the products array with item quantities
//     });

//     // Save the new product item to the database
//     const savedProductItem = await ProductItem.save();

//     res.status(201).json(savedProductItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Get all ProductItems
const getAllProductItems = async (req, res) => {
  try {
    const productItems = await ProductItem.find();
    res.json(productItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific ProductItem by ID
const getProductItemById = async (req, res) => {
  try {
    const productItem = await ProductItem.findById(req.params.id);
    if (productItem) {
      res.json(productItem);
    } else {
      res.status(404).json({ message: 'ProductItem not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a ProductItem
const updateProductItem = async (req, res) => {
  try {
    const updatedProductItem = await ProductItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProductItem) {
      return res.status(404).json({ message: 'ProductItem not found' });
    }
    res.json(updatedProductItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a ProductItem
const deleteProductItem = async (req, res) => {
  try {
    const deletedProductItem = await ProductItem.findByIdAndDelete(req.params.id);
    if (!deletedProductItem) {
      return res.status(404).json({ message: 'ProductItem not found' });
    }
    res.json({ message: 'ProductItem deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createProductItem,
  getAllProductItems,
  getProductItemById,
  updateProductItem,
  deleteProductItem,
};
