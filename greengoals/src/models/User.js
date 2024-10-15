import mongoose, { Schema } from "mongoose"; // Importing both mongoose and Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  isactive: {
    type: Boolean,
    default: true,
  },
  isactive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
