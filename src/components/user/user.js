import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],
    avatar: {
      type: String
    },
    bookmarked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
      }
    ]
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
  bcrypt.compare(password, this.hashedPassword, function(err, equal) {
    if (err) {
      return callback(err);
    }
    callback(null, equal);
  });
};

export default mongoose.model("user", userSchema);
