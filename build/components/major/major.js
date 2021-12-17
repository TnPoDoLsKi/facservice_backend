"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDelete = require("mongoose-delete");

var _mongooseDelete2 = _interopRequireDefault(_mongooseDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var majorSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  level: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Level"
  }
}, {
  timestamps: true
});

majorSchema.plugin(_mongooseDelete2.default, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

exports.default = _mongoose2.default.model("Major", majorSchema);