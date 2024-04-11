require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require('axios');
const router = express.Router();

const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const productItemRoutes = require('../routes/productItemRoutes');
const ItemStockRoute = require('../routes/ItemStockRoute');

const itemRoutes = require("../routes/itemRoutes");
const customerRoutes = require("../routes/customerRoutes");
const storeRoutes = require("../routes/storeRoutes");
const supplierRoutes=require("../routes/supplierRoutes");
const sellerRoutes=require("../routes/sellerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const purchasesRoutes = require("../routes/purchasesRoutes");
const suppliesRoutes = require("../routes/suppliesRoutes");
const productionRoutes = require("../routes/productionRoutes");

const Supplier = require('../models/Supplier');
const Seller = require('../models/Seller');
// const RawMaterials = require('../models/rawMaterialsModel');
const Product = require('../models/Product');
const Items = require('../models/Items');
const { isAuth, isAdmin, sendEmail } = require("../config/auth");

connectDB();
const app = express();

app.set("trust proxy", 1);




app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});
//----------------------------------- Map Pincode Testing !!!----------------------------------
const getPlaceDetails = async (text, place, street, city, country, state, postalcode, latitude, longitude, radius) => {
  const options = {
    method: 'POST',
    url: 'https://google-api31.p.rapidapi.com/map',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '06eae5e604mshd01ec6eeb40e2afp1d9b53jsn420969c910e8',
      'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
    },
    data: {
      text,
      place,
      street,
      city,
      country,
      state,
      postalcode,
      latitude,
      longitude,
      radius
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    // Further processing of response data
  } catch (error) {
    console.error(error.message);
  }
};
app.get('/api/dashboard', async (req, res) => {
  try {
    const supplierCount = await Supplier.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const productCount = await Product.countDocuments();
    const itemCount = await Items.countDocuments();

    const totalCounts = {
      suppliers: supplierCount,
      sellers: sellerCount,
      products: productCount,
      items: itemCount,
    };

    res.status(200).json(totalCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/items/", itemRoutes);
app.use("/api/store/", storeRoutes);
app.use("/api/supplier/",supplierRoutes);
app.use("/api/seller/",sellerRoutes);
app.use('/api/productItem', productItemRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/customer/", customerRoutes);
app.use("/api/order/", isAuth, customerOrderRoutes);
app.use("/api/attributes/", attributeRoutes);
app.use("/api/setting/", settingRoutes);
app.use("/api/currency/", isAuth, currencyRoutes);
app.use("/api/language/", languageRoutes);
app.use("/api/purchases",purchasesRoutes);
app.use("/api/supplies",suppliesRoutes);
app.use("/api/productions",productionRoutes);
app.use ("/api/itmstock",ItemStockRoute);
//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/stores",storeRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
