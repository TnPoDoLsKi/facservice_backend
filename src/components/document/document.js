import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String },
    type: { type: String },
    semestre: { type: Number },
    major: { type: String },
    subject: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("document", documentSchema);
