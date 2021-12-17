"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require("./config/routes");

var _routes2 = _interopRequireDefault(_routes);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressDevice = require("express-device");

var _expressDevice2 = _interopRequireDefault(_expressDevice);

var _connectMongo = require("connect-mongo");

var _connectMongo2 = _interopRequireDefault(_connectMongo);

require("./config/database");

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _env = require("./config/env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongooseConnection from "./config/database";
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

var mongoStore = (0, _connectMongo2.default)(_expressSession2.default);
var sess = {
  secret: _env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {},
  store: new mongoStore({
    mongooseConnection: _mongoose2.default.connection
  })
};

// if (NODE_ENV == "production") sess.cookie.secure = true;

app.use((0, _expressSession2.default)(sess));

app.use(_bodyParser2.default.json({ limit: "100mb" }));

app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _morgan2.default)("dev"));
app.use((0, _cors2.default)());
app.use(_expressDevice2.default.capture());

app.use("/", _routes2.default);
app.use("/", _express2.default.static(_path2.default.join(__dirname, "/../public/front/")));
app.use("/uploads/", _express2.default.static(_path2.default.join(__dirname, "/../public/uploads/")));
app.use("/pdfs/", _express2.default.static(_path2.default.join(__dirname, "/../public/pdfs/")));
app.use("/apidoc/", _express2.default.static(_path2.default.join(__dirname, "/../public/apidoc/")));
app.use("/privacy/", _express2.default.static(_path2.default.join(__dirname, "/../public/privacy/")));
// app.use("/dashboard", express.static(path.join(__dirname, "/../public/dashboard/")));

server.listen(_env.PORT, function () {
  return console.log("start in " + _env.NODE_ENV + " environment on port " + _env.PORT);
});