"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/majors", _majorController.getAll);
  router.get("/majors/byLevel/:level", _majorController.getByLevel);
  router.get("/majors/byName/:name", _majorController.getOneByName);
  router.get("/majors/withInReviewInfos", _majorController.getAllWithInReviewInfos);
  router.get("/majors/:id", _majorController.getOne);

  router.post("/majors", _middlewares.isLoggedIn, _middlewares.isAdmin, _majorController.create);
  router.put("/majors/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _majorController.update);
  router.delete("/majors/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _majorController.remove);
};

var _majorController = require("./majorController");

var _middlewares = require("../../services/middlewares");