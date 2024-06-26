import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  img1: { type: String, required: true },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
  title: { type: String, required: true },
  title2: { type: String },
  type: { type: String },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  color: { type: String },
  brand: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: String },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: String, required: true },
});

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel;
