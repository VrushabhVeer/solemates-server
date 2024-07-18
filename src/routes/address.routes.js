// import express from "express";
// import AddressModel from "../models/address.model.js";
// const addressRouter = express.Router();

// addressRouter.post("/create", async (req, res) => {
//   try {
//     const address = new AddressModel({ ...req.body, userId: req.user._id });
//     const newAddress = await address.save();
//     res.status(201).json({
//       message: "Address saved successfully",
//       data: newAddress,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// addressRouter.get("/", async (req, res) => {
//   try {
//     const address = new AddressModel.find({ userId: req.user._id });
//     res.status(200).json(address);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// addressRouter.put("/update/:id", async (req, res) => {
//   try {
//     const updatedAddress = await AddressModel.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         userId: req.user._id,
//       },
//       req.body,
//       { new: true },
//     );
//     res.status(200).json({
//       message: "Address updated successfully",
//       data: updatedAddress,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// addressRouter.delete("/delete/:id", async (req, res) => {
//   try {
//     await AddressModel.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user._id,
//     });
//     res.status(200).json({ message: "Address deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default addressRouter;

import express from "express";
import AddressModel from "../models/address.model.js";

const addressRouter = express.Router();

addressRouter.post("/create", async (req, res) => {
  try {
    const address = new AddressModel(req.body);
    const newAddress = await address.save();
    res.status(201).json({
      message: "Address saved successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

addressRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const address = await AddressModel.find({ userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

addressRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

addressRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedAddress = await AddressModel.findByIdAndDelete(req.params._id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default addressRouter;
