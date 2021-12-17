"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/levels", _levelController.getAll);
  router.get("/levels/:id", _levelController.getOne);
  router.get("/levels/byFormation/:formation", _levelController.getByFormation);

  router.post("/levels", _middlewares.isLoggedIn, _middlewares.isAdmin, _levelController.create);
  router.put("/levels/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _levelController.update);
  router.delete("/levels/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _levelController.remove);
};

var _levelController = require("./levelController");

var _middlewares = require("../../services/middlewares");