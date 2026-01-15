import mongoose from "mongoose";

const birthSchema = new mongoose.Schema(
  {
    childName: String,
    fatherName: String,
    motherName: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Birth", birthSchema);
