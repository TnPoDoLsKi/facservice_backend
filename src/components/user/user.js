import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
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

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log("generating salt failed");
      return next(err);
    }
    bcrypt.hash(user.hashedPassword, salt, function(err, hash) {
      if (err) {
        console.log("Hashing failed");
        return next(err);
      }
      user.hashedPassword = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.hashedPassword, (err, equal) => {
    if (err) {
      return callback(err);
    }
    callback(null, equal);
  });
};

userSchema.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

export default mongoose.model("User", userSchema);
