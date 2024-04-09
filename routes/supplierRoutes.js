const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controller/supplierController.js");

// Add a Supplier
router.post("/add", addSupplier);
 // Get all Suppliers
 router.get("/", getAllSuppliers);
// Get a Supplier by ID
 router.get("/:id", getSupplierById);
// Update a Supplier
router.put('/:id', updateSupplier);
// Delete a Supplier
 router.delete("/:id", deleteSupplier);
module.exports = router;
