import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const documentSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["DS", "EX", "C", "TD", "TP", "DS1", "DS2"],
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
      enum: ['inReview', 'approved', 'rejected'],
      default: 'inReview'
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
      enum: ["Principale", "Controle"],
      default: "Principale"
    },
    profName: {
      type: String
    },
    corrections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "correction"
      }
    ],
    description: {
      type: String
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
