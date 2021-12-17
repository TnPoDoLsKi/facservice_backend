"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.post("/auth/signup", _authController.signUp);
  router.post("/auth/signin", _authController.signIn);
  router.post("/auth/signout", _middlewares.isLoggedIn, _authController.signOut);

  router.get("/activate/:token", _authController.activeAccount);
  router.get("/verifyAccess", _middlewares.isLoggedIn, _authController.verifyAccess);
};

var _authController = require("./authController");

var _middlewares = require("../../services/middlewares");