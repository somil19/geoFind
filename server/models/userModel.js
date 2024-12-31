import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: { type: String }, // Embedded addresses
  // isAdmin: { type: Boolean, default: false },
});

// const AddressSchema = new mongoose.Schema({
//   houseNo: { type: String, required: true },
//   apartmentDetails: { type: String, required: true },
//   category: { type: String, required: true },
// });

const User = mongoose.model("User", UserSchema);
export default User;
