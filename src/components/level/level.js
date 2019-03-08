import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    formation:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formation"
    }
  },
  {
    timestamps: true
  }
);

levelSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("Level", levelSchema);
