"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _majorRoutes = require("../components/major/majorRoutes");

var _majorRoutes2 = _interopRequireDefault(_majorRoutes);

var _formationRoutes = require("../components/formation/formationRoutes");

var _formationRoutes2 = _interopRequireDefault(_formationRoutes);

var _levelRoutes = require("../components/level/levelRoutes");

var _levelRoutes2 = _interopRequireDefault(_levelRoutes);

var _subjectRoutes = require("../components/subject/subjectRoutes");

var _subjectRoutes2 = _interopRequireDefault(_subjectRoutes);

var _userRoutes = require("../components/user/userRoutes");

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _authRoutes = require("../components/auth/authRoutes");

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _documentRoutes = require("../components/document/documentRoutes");

var _documentRoutes2 = _interopRequireDefault(_documentRoutes);

var _correctionRoutes = require("../components/correction/correctionRoutes");

var _correctionRoutes2 = _interopRequireDefault(_correctionRoutes);

var _versionRoutes = require("../components/version/versionRoutes");

var _versionRoutes2 = _interopRequireDefault(_versionRoutes);

var _remoteRoutes = require("../components/remote/remoteRoutes");

var _remoteRoutes2 = _interopRequireDefault(_remoteRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

(0, _majorRoutes2.default)(router);
(0, _formationRoutes2.default)(router);
(0, _levelRoutes2.default)(router);
(0, _subjectRoutes2.default)(router);
(0, _userRoutes2.default)(router);
(0, _authRoutes2.default)(router);
(0, _documentRoutes2.default)(router);
(0, _correctionRoutes2.default)(router);
(0, _versionRoutes2.default)(router);
(0, _remoteRoutes2.default)(router);

exports.default = router;