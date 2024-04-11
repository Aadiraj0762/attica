const express = require('express');
const router = express.Router();
const { updateItemStock } = require('../controller/itemStockController');

router.post('/updateItemStock', updateItemStock);

module.exports = router;
