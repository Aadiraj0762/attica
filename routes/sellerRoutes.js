const express = require("express");
const router = express.Router();
const {
  addSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} = require("../controller/sellerController.js");

// Add a Seller
router.post("/add", addSeller);
 // Get all Sellers
 router.get("/", getAllSellers);
// Get a Seller by ID
 router.get("/:id", getSellerById);
// Update a Seller
 router.patch("/:id", updateSeller);
// Delete a Seller
 router.delete("/:id", deleteSeller);
module.exports = router;
