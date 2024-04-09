const express = require("express");
const router = express.Router();
const productionController = require("../controller/productionController");

router.get("/", productionController.getProductions);
router.post("/add", productionController.createProduction);
router.get("/:id", productionController.getProductionById);
router.put("/:id", productionController.updateProduction);
router.delete("/:id", productionController.deleteProduction);

module.exports = router;
