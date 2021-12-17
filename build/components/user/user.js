"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDelete = require("mongoose-delete");

var _mongooseDelete2 = _interopRequireDefault(_mongooseDelete);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
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
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Major"
  },
  token: {
    type: String
  },
  suspended: {
    type: Boolean,
    default: false
  },
  activated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.virtual("password").set(function (password) {
  this.hashedPassword = _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10));
});

userSchema.methods = {
  comparePassword: function comparePassword(candidatePassword) {
    return _bcrypt2.default.compareSync(candidatePassword, this.hashedPassword);
  }
};

userSchema.plugin(_mongooseDelete2.default, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

exports.default = _mongoose2.default.model("User", userSchema);