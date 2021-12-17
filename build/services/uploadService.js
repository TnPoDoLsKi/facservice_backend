"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = upload;

var _formidable = require("formidable");

var _formidable2 = _interopRequireDefault(_formidable);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _env = require("../config/env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {post} /documents/upload Upload a file
 * @apiGroup Documents
 * @apiName Upload
 * @apiParam {File} files File to upload
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Uploaded
 *    HTTP/1.1 200 OK
 * [ "http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg", "http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg" ]
 *
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

// upload
var config = {
  // storage
  uploadDir: _path2.default.join(__dirname, "../../public", "uploads"),
  maxFileSize: 100 * 1024 * 1024,
  maxFieldsSize: 100 * 1024 * 1024,
  multiple: true
};

async function upload(req, res) {
  var fileUrls = [];
  // abort handler
  var _abortHandler = function _abortHandler() {
    var error = new Error("request canceled");
    res.status(444).send({
      error: error
    });
  };

  // error handler
  var _errorHandler = function _errorHandler(error) {
    res.status(500).send({
      error: error
    });
  };

  /* 
     file handler 
      @params: 
        name: filed name that contains the files,
        file: file meta 
    */
  var _fileHandler = function _fileHandler(name, file) {

    var url = _env.HOST + "/uploads/" + file.path.split("/").pop();

    // for windows env
    // url = host + "/uploads/" + file.path.split("\\").pop();

    fileUrls.push(url);
    return fileUrls;
  };
  /* 
     field handler 
    */
  var _fieldHandler = function _fieldHandler(name, value) {
    req.form = req.form || {};
    req.form[name] = value;
  };

  // midleware
  try {
    var form = new _formidable2.default.IncomingForm(config);
    form.keepExtensions = true;
    form.parse(req);
    form.on("file", _fileHandler);
    form.on("field", _fieldHandler);
    form.on("error", _errorHandler);
    form.on("aborted", _abortHandler);
    form.on("end", function () {
      console.log("uploaded");
      res.json(fileUrls);
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send(error);
  }
}
// end