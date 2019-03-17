import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    semestre: {
      type: Number,
      enum: [1, 2],
      default: 1
    },
    majors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Major"
      }
    ],
    documentsCount: {
      DS: { type: Number, default: 0 },
      EX: { type: Number, default: 0 },
      C: { type: Number, default: 0 },
      TD: { type: Number, default: 0 },
      TP: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

subjectSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("Subject", subjectSchema);
