"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDelete = require("mongoose-delete");

var _mongooseDelete2 = _interopRequireDefault(_mongooseDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subjectSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  semestre: {
    type: Number,
    enum: [1, 2],
    default: 1
  },
  majors: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Major"
  }],
  documentsCount: {
    DS: { type: Number, default: 0 },
    EX: { type: Number, default: 0 },
    C: { type: Number, default: 0 },
    TD: { type: Number, default: 0 },
    TP: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

subjectSchema.plugin(_mongooseDelete2.default, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

exports.default = _mongoose2.default.model("Subject", subjectSchema);