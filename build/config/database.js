"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _env = require("./env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_env.DB, {
  useNewUrlParser: true
}, function (err) {
  if (!err) {
    console.log("Connect To Database -------------------<");
    return;
  }
  console.log(err);
});