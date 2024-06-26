import express from "express";
import CartModel from "../models/cart.model.js";
const cartRouter = express.Router();

cartRouter.post("/create", async (req, res) => {
  try {
    const cartItem = new CartModel(req.body);
    const newCartItem = await cartItem.save();
    res.status(201).json({
      message: "Added to Cart",
      data: newCartItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

cartRouter.get("/:userId", async (req, res) => {
  try {
    const cartItem = CartModel.find({ userId: req.params.userId });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default cartRouter;

cartRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const deleteCartItem = await CartModel.findOneAndDelete({
      _id: cartId,
      userId: req.body.userId,
    });

    if (!deleteCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
