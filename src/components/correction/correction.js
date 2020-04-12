import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const correctionSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    filePath: {
      type: String
    },
    filesStaging: [
      {
        type: String
      }
    ],
    stagingFilesType: {
      type: String,
      enum: ["images", "pdfs"],
      default: "images"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    verifiedByProf: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "document"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
