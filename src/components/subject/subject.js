import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("subject", subjectSchema);
