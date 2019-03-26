import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const versionSchema = new mongoose.Schema(
  {
    version: { type: String },
    title: { type: String },
    description: { type: String },
    forceUpdate: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

versionSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("Version", versionSchema);
