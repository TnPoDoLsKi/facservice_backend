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
    filesStaging: [
      {
        type: String
      }
    ],
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

correctionSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("correction", correctionSchema);
