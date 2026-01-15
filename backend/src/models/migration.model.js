import mongoose from "mongoose";

const migrationSchema = new mongoose.Schema(
  {
    fullName: String,
    fromAddress: String,
    toAddress: String,
    reason: String,
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Migration", migrationSchema);
