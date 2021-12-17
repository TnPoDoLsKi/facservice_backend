"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/corrections", _correctionController.getAll);
  router.get("/corrections/byStatus/:status", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.getAllByStatus);
  router.get("/corrections/approved/bySubject/:subjectId", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.getAllApprovedBySubject);
  router.get("/corrections/pending/bySubject/:subjectId", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.getAllPendingBySubject);
  router.get("/corrections/pending/byDocument/:documentId", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.getAllPendingByDocument);
  router.get("/corrections/:id", _correctionController.getOne);
  router.get("/corrections/byDocument/:documentId", _correctionController.getAllByDocument);
  router.get("/corrections/byUser/:userId", _correctionController.getByUser);

  // router.post("/corrections/convert", isLoggedIn, convert);
  router.post("/corrections", _middlewares.isLoggedIn, _correctionController.create);
  router.put("/corrections/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.update);
  router.delete("/corrections/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _correctionController.remove);
};

var _correctionController = require("./correctionController");

var _middlewares = require("../../services/middlewares");