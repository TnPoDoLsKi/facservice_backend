import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    semestre: {
      type: Number,
      enum: [1, 2],
      default: 1
    },
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
      }
    ],
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major"
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

subjectSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("Subject", subjectSchema);
