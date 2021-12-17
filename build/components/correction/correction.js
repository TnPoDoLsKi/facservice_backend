"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDelete = require("mongoose-delete");

var _mongooseDelete2 = _interopRequireDefault(_mongooseDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var correctionSchema = new _mongoose2.default.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  filePath: {
    type: String
  },
  filesStaging: [{
    type: String
  }],
  stagingFilesType: {
    type: String,
    enum: ["images", "pdfs"],
    default: "images"
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  verifiedByProf: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  document: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "document"
  },
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

correctionSchema.plugin(_mongooseDelete2.default, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

exports.default = _mongoose2.default.model("correction", correctionSchema);