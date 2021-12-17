"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || "development";
var PORT = exports.PORT = process.env.PORT || 3000;
var DB = exports.DB = process.env.MONGODB_URI || "mongodb+srv://facservice:facservice@cluster0.fuo82.mongodb.net/facservice?retryWrites=true&w=majority";
var SECRET = exports.SECRET = process.env.SECRET || "thisisaverysecurestringtonotbeinghacked";
var HOST = exports.HOST = process.env.HOST || "http://localhost:3000";