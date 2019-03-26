import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    hashedPassword: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["admin", "professor", "student"],
      default: "student"
    },
    avatar: {
      type: String
    },
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major"
    },
    token: {
      type: String
    },
    suspended: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("password").set(function(password) {
  this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
});

userSchema.methods = {
  comparePassword(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.hashedPassword);
  }
};

userSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("User", userSchema);
