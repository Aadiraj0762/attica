const Items = require("../models/Items");
const mongoose = require("mongoose");
const Category = require("../models/Category");

const addItem = async (req, res) => {
  try {
    const newProduct = new Items({
      ...req.body,
      // productId: cname + (count + 1),
      productId: req.body.productId
        ? req.body.productId
        : mongoose.Types.ObjectId(),
    });

    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const addAllItems = async (req, res) => {
  try {
    // console.log('product data',req.body)
    await Items.
  deleteMany();
    await Items.
  insertMany(req.body);
    res.status(200).send({
      message: "Product Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingItems = async (req, res) => {
  try {
    const products = await Items.
  find({ status: "show" }).sort({ _id: -1 });
    res.send(products);
    // console.log("products", products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllItems = async (req, res) => {
  const { title, category, price, page, limit } = req.query;
  //  console.log('title',title)
  let queryObject = {};
  let sortObject = {};
  if (title) {
    queryObject.$or = [
      { "title.en": { $regex: `${title}`, $options: "i" } },
      { "title.de": { $regex: `${title}`, $options: "i" } },
      { "title.es": { $regex: `${title}`, $options: "i" } },
      { "title.bn": { $regex: `${title}`, $options: "i" } },
      { "title.sl": { $regex: `${title}`, $options: "i" } },
    ];
  }

  if (price === "low") {
    sortObject = {
      "prices.originalPrice": 1,
    };
  } else if (price === "high") {
    sortObject = {
      "prices.originalPrice": -1,
    };
  } else if (price === "published") {
    queryObject.status = "show";
  } else if (price === "unPublished") {
    queryObject.status = "hide";
  } else if (price === "status-selling") {
    queryObject.stock = { $gt: 0 };
  } else if (price === "status-out-of-stock") {
    queryObject.stock = { $lt: 1 };
  } else if (price === "date-added-asc") {
    sortObject.createdAt = 1;
  } else if (price === "date-added-desc") {
    sortObject.createdAt = -1;
  } else if (price === "date-updated-asc") {
    sortObject.updatedAt = 1;
  } else if (price === "date-updated-desc") {
    sortObject.updatedAt = -1;
  } else {
    sortObject = { _id: -1 };
  }

  // console.log('sortObject', sortObject);

  if (category) {
    queryObject.categories = category;
  }

  const pages = Number(page);
  const limits = Number(limit);
  const skip = (pages - 1) * limits;

  try {
    const totalDoc = await Items.
  countDocuments(queryObject);

    const products = await Items.
  find(queryObject)
      .populate({ path: "category", select: "_id name" })
      .populate({ path: "categories", select: "_id name" })
      .sort(sortObject)
      .skip(skip)
      .limit(limits);

    res.send({
      products,
      totalDoc,
      limits,
      pages,
    });
  } catch (err) {
    // console.log("error", err);
    res.status(500).send({
      message: err.message,
    });
  }
};

const getItemBySlug = async (req, res) => {
  // console.log("slug", req.params.slug);
  try {
    const product = await Items.
  findOne({ slug: req.params.slug });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const product = await Items.
  findById(req.params.id)
      .populate({ path: "category", select: "_id, name" })
      .populate({ path: "categories", select: "_id name" });

    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateItem = async (req, res) => {
  // console.log('update product')
  // console.log('variant',req.body.variants)
  try {
    const product = await Items.
  findById(req.params.id);
    // console.log("product", product);

    if (product) {
      product.title = { ...product.title, ...req.body.title };
      product.description = {
        ...product.description,
        ...req.body.description,
      };

      product.productId = req.body.productId;
      product.sku = req.body.sku;
      product.barcode = req.body.barcode;
      product.slug = req.body.slug;
      product.categories = req.body.categories;
      product.category = req.body.category;
      product.show = req.body.show;
      product.isCombination = req.body.isCombination;
      product.variants = req.body.variants;
      product.stock = req.body.stock;
      product.prices = req.body.prices;
      product.image = req.body.image;
      product.tag = req.body.tag;

      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    } else {
      res.status(404).send({
        message: "Product Not Found!",
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
    // console.log('err',err)
  }
};

const updateManyItems = async (req, res) => {
  try {
    const updatedData = {};
    for (const key of Object.keys(req.body)) {
      if (
        req.body[key] !== "[]" &&
        Object.entries(req.body[key]).length > 0 &&
        req.body[key] !== req.body.ids
      ) {
        // console.log('req.body[key]', typeof req.body[key]);
        updatedData[key] = req.body[key];
      }
    }

    // console.log("updated data", updatedData);

    await Items.
  updateMany(
      { _id: { $in: req.body.ids } },
      {
        $set: updatedData,
      },
      {
        multi: true,
      }
    );
    res.send({
      message: "Products update successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Items.
  updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteItem = (req, res) => {
  Items.
  deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
      });
    }
  });
};

const getShowingStoreItems = async (req, res) => {
  // console.log("req.body", req);
  try {
    const queryObject = {};

    const { category, title } = req.query;
    // console.log("category", category);

    queryObject.status = "show";

    if (category) {
      queryObject.categories = {
        $in: [category],
      };
    }

    if (title) {
      queryObject.$or = [
        { "title.en": { $regex: `${title}`, $options: "i" } },
        { "title.de": { $regex: `${title}`, $options: "i" } },
        { "title.es": { $regex: `${title}`, $options: "i" } },
        { "title.bn": { $regex: `${title}`, $options: "i" } },
        { "title.sl": { $regex: `${title}`, $options: "i" } },
        { slug: `${title}` },
      ];
    }

    const products = await Items.
  find(queryObject)
      .populate({ path: "category", select: "name _id" })
      .sort({ _id: -1 })
      .limit(100);

    const relatedProduct = await Items.
  find({
      category: products[0]?.category,
    }).populate({ path: "category", select: "_id name" });

    res.send({
      products,
      relatedProduct,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteManyItems = async (req, res) => {
  try {
    const cname = req.cname;
    // console.log("deleteMany", cname, req.body.ids);

    await Items.
  deleteMany({ _id: req.body.ids });

    res.send({
      message: `Products Delete Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
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
};
