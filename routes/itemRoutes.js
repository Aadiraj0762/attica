const express = require("express");
const router = express.Router();
const {
  addItem,
  addAllItems,
  getAllItems,
  getShowingItems,
  getItemById,
  getItemBySlug,
  updateItem,
  updateManyItems,
  updateStatus,
  deleteItem,
  deleteManyItems,
  getShowingStoreItems,
} = require("../controller/itemController");

//add an item
router.post("/add", addItem);

//add multiple items
router.post("/all", addAllItems);

//get an item
router.get("/:id", getItemById);

//get showing items only
router.get("/show", getShowingItems);

//get showing items in store
router.get("/store", getShowingStoreItems);

//get all items
router.get("/", getAllItems);

//get an item by slug
router.get("/item/:slug", getItemBySlug);

//update an item
router.patch("/:id", updateItem);

//update many items
router.patch("/update/many", updateManyItems);

//update an item status
router.put("/status/:id", updateStatus);

//delete an item
router.delete("/:id", deleteItem);

//delete many items
router.patch("/delete/many", deleteManyItems);

module.exports = router;
