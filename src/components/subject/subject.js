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
    majors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major"
    }],
    documentsCount: {
      ds: { type: Number, default: 0 },
      ex: { type: Number, default: 0 },
      c: { type: Number, default: 0 },
      td: { type: Number, default: 0 },
      tp: { type: Number, default: 0 }
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
