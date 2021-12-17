"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/subjects", _subjectController.getAll);
  router.get("/subjects/:id", _subjectController.getOne);
  router.get("/subjects/byMajor/:id", _subjectController.getByMajor);

  router.put("/subjects/getByMajors", _subjectController.getByMajors);

  router.post("/subjects", _middlewares.isLoggedIn, _middlewares.isAdmin, _subjectController.create);
  router.put("/subjects/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _subjectController.update);
  router.delete("/subjects/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _subjectController.remove);
};

var _subjectController = require("./subjectController");

var _middlewares = require("../../services/middlewares");