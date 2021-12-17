"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/user", _middlewares.isLoggedIn, _userController.getCurrent);
  router.get("/users", _middlewares.isLoggedIn, _middlewares.isAdmin, _userController.getAll);
  router.get("/users/:type", _middlewares.isLoggedIn, _middlewares.isAdmin, _userController.getByType);

  router.put("/users", _middlewares.isLoggedIn, _userController.update);
  router.delete("/users/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _userController.remove);
};

var _userController = require("./userController");

var _middlewares = require("../../services/middlewares");