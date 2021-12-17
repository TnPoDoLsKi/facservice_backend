"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get("/documents/byStatus/:status", _middlewares.isLoggedIn, _middlewares.isAdmin, _documentController.getAllByStatus);
  router.get("/documents/bySubject/:subjectId", _documentController.getDocBySubject);
  router.get("/documents/pending/bySubject/:subjectId", _documentController.getPendingDocBySubject);
  router.get("/documents/bySubject/:subjectId/byType/:type?", _documentController.getDocBySubjectByType);
  router.get("/documents/byMajor/:majorID", _documentController.getDocByMajor);
  router.get("/documents/byUser", _middlewares.isLoggedIn, _documentController.getDocByUser);
  router.get("/documents/search/", _documentController.search);

  router.get("/documents", _documentController.getAll);
  router.get("/documents/:id", _documentController.getOne);

  router.post("/documents", _middlewares.isLoggedIn, _documentController.create);
  router.post("/documents/upload", _middlewares.isLoggedIn, _uploadService.upload);
  // router.post("/documents/convert", convert);

  router.put("/documents/:id", _middlewares.isLoggedIn, _documentController.update);
  router.delete("/documents/:id", _middlewares.isLoggedIn, _middlewares.isAdmin, _documentController.remove);
};

var _documentController = require("./documentController");

var _uploadService = require("../../services/uploadService");

var _middlewares = require("../../services/middlewares");