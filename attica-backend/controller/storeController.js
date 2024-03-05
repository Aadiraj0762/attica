const express = require("express");
const router = express.Router();
const Store = require("../models/Store");
const mongoose = require("mongoose");

// Add a store
const addStore = async (req, res) => {
  const store = new Store({
    storeId: req.body.storeId,
    storeName: req.body.storeName,
    addressLine: req.body.addressLine,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    pinCode: req.body.pinCode,
    landmark: req.body.landmark,
    storeOpenTime: req.body.storeOpenTime,
    storeCloseTime: req.body.storeCloseTime,
    radius: req.body.radius,
    status: req.body.status,
    manager: req.body.manager,
    user: req.body.user,
    landline: req.body.landline,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    storeImage: req.body.storeImage,
  });

  store.save((err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(store);
    }
  });
};

// Get all stores
  const getAllStores = async (req, res) => {
  Store.find()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Get a store by ID
  const getStoreById = async (req, res) => {
  Store.findById(req.params.id)
    .then(store => {
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json(store);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Update a store
const updateStore = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Store.findByIdAndUpdate(id, updateData, { new: true })
    .then(store => {
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json(store);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Delete a store
const deleteStore = async (req, res) => {
  const id = req.params.id;
  Store.findByIdAndRemove(id)
    .then(() => {
      res.json({ message: "Store deleted successfully" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

async function getStoresByRadius(req, res) {
  try {
    const radius = req.params.radius;
    const stores = await Store.find({
      where: {
        distance: {
          [Op.gt]: radius,
        },
      },
    });

    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
module.exports = {
  addStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
   getStoresByRadius,

};
