import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const majorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    formation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formation"
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level"
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ]
  },
  {
    timestamp: true
  }
);

majorSchema.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("Major", majorSchema);
