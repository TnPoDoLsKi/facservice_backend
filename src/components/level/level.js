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

levelSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("Level", levelSchema);
