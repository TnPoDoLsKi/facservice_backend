import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("level", levelSchema);
