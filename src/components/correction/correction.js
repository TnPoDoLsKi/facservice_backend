import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const correctionSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    filePath: {
      type: String
    },
    approved: {
      type: Boolean,
      default: false
    },
    verifiedByProf: {
      type: Boolean,
      default: false
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    score: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

correctionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});
export default mongoose.model("correction", correctionSchema);
