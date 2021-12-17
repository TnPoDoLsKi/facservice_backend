"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.post("/remote/resetdb", _middlewares.isLoggedIn, _middlewares.isAdmin, _remoteController.resetcollections);
};

var _remoteController = require("./remoteController");

var _middlewares = require("../../services/middlewares");