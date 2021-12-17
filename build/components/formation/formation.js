"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDelete = require("mongoose-delete");

var _mongooseDelete2 = _interopRequireDefault(_mongooseDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formationSchema = new _mongoose2.default.Schema({
  name: { type: String },
  description: { type: String }
}, {
  timestamps: true
});

formationSchema.plugin(_mongooseDelete2.default, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

exports.default = _mongoose2.default.model("Formation", formationSchema);