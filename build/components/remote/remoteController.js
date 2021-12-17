"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetcollections = resetcollections;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function resetcollections(req, res) {
  try {

    await _models.Correction.delete();
    await _models.Document.delete();
    await _models.Subject.delete();
    await _models.Major.delete();
    await _models.Level.delete();
    await _models.Formation.delete();

    _shelljs2.default.cd(__dirname + '../../../');
    _shelljs2.default.exec('npm run seeds');

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}