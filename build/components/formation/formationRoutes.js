"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/formations", _formationController.getAll);
  router.get("/formations/:id", _formationController.getOne);
  router.post("/formations", _middlewares.isLoggedIn, _middlewares.isAdmin, _formationController.create);
  router.put("/formations/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _formationController.update);
  router.delete("/formations/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _formationController.remove);
};

var _formationController = require("./formationController");

var _middlewares = require("../../services/middlewares");