const Product = require('../models/product');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  const product = new Product({ name, description, price, stock });
  await product.save();
  
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).send();
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };