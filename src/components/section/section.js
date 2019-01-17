import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
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

export default mongoose.model("section", sectionSchema);
