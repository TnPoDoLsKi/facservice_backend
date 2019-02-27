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
      enum: ["admin", "prof", "student"],
      default: "student"
    },
    avatar: {
      type: String
    },
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major"
    }
  },
  {
    timestamp: true
  }
);

userSchema.virtual("password").set(function(password) {
  this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.hashedPassword, (err, equal) => {
    if (err) {
      return callback(err);
    }
    callback(null, equal);
  });
};

userSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deleted;
  return obj;
};

export default mongoose.model("User", userSchema);
