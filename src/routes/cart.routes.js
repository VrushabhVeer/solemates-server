import express from "express";
import CartModel from "../models/cart.model.js";
import auth from "../middlewares/auth.js";
const cartRouter = express.Router();

cartRouter.post("/create", auth, async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const existingItem = await CartModel.findOne({ userId, itemId, size });

    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Product with the same size already in Cart" });
    }

    const cartItem = new CartModel(req.body);
    const newCartItem = await cartItem.save();

    res.status(201).json({
      message: "Added to Cart",
      data: newCartItem,
    });
  } catch (error) {
    if (error.code === 11000) {
      console.error(`Duplicate key error: ${error.message}`);
      return res
        .status(400)
        .json({ message: "Product with the same size already in Cart" });
    } else {
      console.error(`Error adding item to cart: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  }
});

cartRouter.get("/:userId", async (req, res) => {
  try {
    const cartItem = await CartModel.find({ userId: req.params.userId });
    if (!cartItem.length) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleteCartItem = await CartModel.findOneAndDelete({ _id: itemId });

    if (!deleteCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/delete/all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await CartModel.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found for this user" });
    }

    res.status(200).json({ message: "All items removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartRouter;
