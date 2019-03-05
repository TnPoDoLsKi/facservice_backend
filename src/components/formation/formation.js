import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const formationSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

formationSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

formationSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("Formation", formationSchema);
