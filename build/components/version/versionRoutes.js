"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/versions", _versionController.getAll);
  router.get("/version/last", _versionController.getLast);
  router.get("/version/:clientVersion", _versionController.getFromVersion);

  router.post("/version", _middlewares.isLoggedIn, _middlewares.isAdmin, _versionController.create);
  router.put("/version/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _versionController.update);
  router.delete("/version/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _versionController.remove);
};

var _versionController = require("./versionController");

var _middlewares = require("../../services/middlewares");