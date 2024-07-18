import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
});

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;
