import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["citizen", "officer", "admin"],
      default: "citizen"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
