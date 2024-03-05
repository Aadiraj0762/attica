const express = require('express');
const router = express.Router();
// const purchasesController = require('../controllers/purchasesController');
const purchasesController =require("../controller/purchasesController");
router.post('/addpurchases', purchasesController.createPurchase);
router.get('/purchases', purchasesController.getAllPurchases);
router.get('/purchases/:id', purchasesController.getPurchaseById);
router.put('/purchases/:id', purchasesController.updatePurchase);
router.delete('/purchases/:id', purchasesController.deletePurchase);

module.exports = router;
