import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    formation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formation"
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level"
    }
  },
  {
    timestamps: true
  }
);

sectionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

sectionSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("Section", sectionSchema);
