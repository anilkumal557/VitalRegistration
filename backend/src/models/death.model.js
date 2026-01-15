import mongoose from "mongoose";

const deathSchema = new mongoose.Schema(
  {
    deceasedName: String,
    dateOfDeath: Date,
    causeOfDeath: String,
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Death", deathSchema);
