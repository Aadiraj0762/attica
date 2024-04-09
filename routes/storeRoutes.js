const express = require("express");
const router = express.Router();
const {
  addStore,
  getAllStores,
  getStoreById,
  getStoresByRadius,
  updateStore,
  deleteStore,
} = require("../controller/storeController.js");

// Add a store
router.post("/add", addStore);
 // Get all stores
 router.get("/", getAllStores);
// Get a store by ID
 router.get("/:id", getStoreById);
 // Get stores within a radius
router.get("/radius/:radius", getStoresByRadius);
// Update a store
 router.patch("/:id", updateStore);
// Delete a store
 router.delete("/:id", deleteStore);
module.exports = router;
