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
    type: {
      type: String,
      enum: ["DS", "EX", "C", "TD", "TP", "DS1", "DS2"],
      default: "DS"
    },
    semestre: {
      type: Number,
      enum: [1, 2],
      default: 1
    },
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major"
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    },
    year: {
      type: Number
    },
    approved: {
      type: Boolean,
      default: false
    },
    NBDowloads: {
      type: Number,
      default: 0
    },
    verifiedByProf: {
      type: Boolean,
      default: false
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
    ]
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
