import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String },
    type: { type: String },
    semestre: { type: Number },
    major: { type: String },
    subject: { type: String },
    year: { type: Number },
    approved: { type: Boolean },
    NBDowloads: { type: Number },
    verifiedByProf: { type: Boolean },
    user: { type: String },
    session: { type: Boolean },
    profName: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("document", documentSchema);
