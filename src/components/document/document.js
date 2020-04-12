import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const documentSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["DS", "EX", "C", "TD", "TP"],
      default: "DS"
    },
    year: {
      type: Number
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    NBDowloads: {
      type: Number,
      default: 0
    },
    session: {
      type: String,
      enum: ["Principale", "Rattrapage"]
    },
    profName: {
      type: String
    },
    hasCorrection: {
      type: Boolean,
      default: false
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
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

documentSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("document", documentSchema);
