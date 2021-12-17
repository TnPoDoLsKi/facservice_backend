"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = isLoggedIn;
exports.isAdmin = isAdmin;

var _models = require("../config/models");

async function isLoggedIn(req, res, next) {
  try {
    var token = null;

    if ("authorization" in req.headers) {
      var bearer = req.headers["authorization"];
      token = bearer.split(" ")[1];
    } else if (req.session && req.session.token) {
      token = req.session.token;
    }

    if (!token) {
      return res.status(401).json({
        error: "Authorization token required !"
      });
    }

    var user = await _models.User.findOne({ token: token });

    if (!user) return res.status(401).json({
      error: "Unauthorized"
    });

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

function isAdmin(req, res, next) {
  try {
    if (req.user.type == "admin") return next();

    return res.status(401).end();
  } catch (error) {
    res.status(500).end();
  }
}