import express from "express";
import WishlistModel from "../models/wishlist.model.js";
const wishlistRouter = express.Router();

wishlistRouter.post("/create", async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const existingItem = await WishlistModel.findOne({ userId, itemId });
    if (existingItem) {
      return res.status(400).json({ message: "Item already in Wishlist" });
    }
    const wishlistItem = new WishlistModel(req.body);
    const newWishlistItem = await wishlistItem.save();
    res.status(201).json({
      message: "Added to Wishlist",
      data: newWishlistItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.get("/:userId", async (req, res) => {
  try {
    const wishlistItem = await WishlistModel.find({
      userId: req.params.userId,
    });
    res.status(200).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.delete("/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleteWishlistItem = await WishlistModel.findOneAndDelete({
      _id: itemId,
      userId: req.body.userId,
    });
    if (!deleteWishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    res.status(200).json({ message: "Item Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default wishlistRouter;
