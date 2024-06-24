import express from "express";
import ProductModel from "../models/products.model.js";
const productsRouter = express.Router();

// POST route to create a new product
productsRouter.post("/create", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const newProducts = await ProductModel.insertMany(req.body);
      res.status(201).json(newProducts);
    } else {
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json(newProduct);
    }
  } catch (error) {}
});

// GET route to fetch all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a single product by id
productsRouter.get("/:product_id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findOne({ _id });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default productsRouter;
