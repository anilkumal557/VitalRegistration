import mongoose from "mongoose";

const marriageSchema = new mongoose.Schema(
  {
    groomName: String,
    brideName: String,
    marriageDate: Date,
    marriagePlace: String,
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Marriage", marriageSchema);
