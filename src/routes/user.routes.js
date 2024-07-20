import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";

dotenv.config();

const userRouter = Router();
const key = process.env.SECRET_KEY;

// Sign up
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: messages.join(", ") });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again", error });
    }
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, userName: user.name }, key, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      userName: user.name,
      userEmail: user.email,
      userId: user._id,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again", error });
  }
});

export default userRouter;
