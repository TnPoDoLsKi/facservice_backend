import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    filePath: {
      type: String,
      enum: ["DS", "EX", , "C", "TD", "TP", "DS1", "DS2"],
      default: "DS"
    },
    semestre: { type: Number },
    major: { type: String },
    subject: { type: String },
    year: { type: Number },
    approved: { type: Number } /*boolean*/,
    NBDowloads: { type: Number },
    verifiedByProf: { type: Number } /*boolean*/,
    user: { type: String },
    session: { type: String },
    profName: { type: Number }
  },
  {
    timestamps: true
  }
);

documentSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});
export default mongoose.model("document", documentSchema);
