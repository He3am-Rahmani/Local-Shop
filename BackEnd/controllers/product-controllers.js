const Mongoose = require("mongoose");
const products = require("../models/products");
const Products = require("../models/ProductsModel");
const db = require("mongodb");

const getAllProducts = async (req, res, next) => {
  let data;
  data = await Products.find({});

  await res.json(data);
};

const getProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  res.json(product);
};


exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
