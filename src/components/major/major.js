import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const majorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
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

majorSchema.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("Major", majorSchema);
