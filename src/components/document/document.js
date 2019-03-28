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
    type: {
      type: String,
      enum: ["DS", "EX", "C", "TD", "TP"],
      default: "DS"
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
