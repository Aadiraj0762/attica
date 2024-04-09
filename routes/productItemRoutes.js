const express = require("express");
const router = express.Router();
const productItemController = require("../controller/productItemController")
// Routes for CRUD operations
router.post("/add", productItemController.createProductItem);
router.get("/", productItemController.getAllProductItems);
router.get("/:id", productItemController.getProductItemById);
router.put("/:id", productItemController.updateProductItem);
router.delete("/:id", productItemController.deleteProductItem);

module.exports = router;
