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
    filesStaging: [{
      type: String
    }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    verifiedByProf: {
      type: Boolean,
      default: false
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "document"
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
