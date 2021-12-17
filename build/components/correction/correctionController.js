"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.getOne = getOne;
exports.getAllByDocument = getAllByDocument;
exports.getAllByStatus = getAllByStatus;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.getByUser = getByUser;
exports.getAllApprovedBySubject = getAllApprovedBySubject;
exports.getAllPendingBySubject = getAllPendingBySubject;
exports.getAllPendingByDocument = getAllPendingByDocument;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _pdfmake = require("pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _easyPdfMerge = require("easy-pdf-merge");

var _easyPdfMerge2 = _interopRequireDefault(_easyPdfMerge);

var _env = require("../../config/env");

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getAll(req, res) {
  try {
    var corrections = await _models.Correction.find().populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging");

    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

async function getOne(req, res) {
  try {
    var correction = await _models.Correction.findById({
      _id: req.params.id
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging");

    return res.json(correction);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({
      error: error.message
    });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/byDocument/:id Get document's corrections
 * @apiGroup Corrections
 * @apiParam {id} id Document id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAllByDocument(req, res) {
  try {
    var corrections = await _models.Correction.find({
      document: req.params.documentId,
      status: "approved"
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging");

    return res.json(corrections);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({
      error: error.message
    });
    console.log(error);

    return res.status(500).end();
  }
}

async function getAllByStatus(req, res) {
  try {
    if (!["pending", "approved", "rejected"].includes(req.params.status)) {
      return res.status(400).json({
        error: "status must be 'pending', 'approved' or 'rejected'"
      });
    }

    var corrections = await _models.Correction.find({
      status: req.params.status
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).populate({
      path: "document",
      populate: {
        path: "subject",
        select: "name",
        populate: { path: "majors", select: "_id name" }
      }
    });
    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {post} /corrections Create a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "filesStaging": ["https://igc.tn/img/portfolio/HC1-Prev.jpg", "https://igc.tn/img/portfolio/A2-Prev.jpg"],
 *      "document": "5c41b2d82383c111b4ffad1a",
 *      "description": "Correction Correction Correction Correction"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "_id": "5c88f1c4719c206b4524de83",
        "deleted": false,
        "document": "5c41b2d82383c111b4ffad1a",
        "title": "corrigé de EX physique 2015",
        "user": "5c8783b34a35cd28fa5bea3b",
        "createdAt": "2019-03-13T12:04:20.911Z",
        "updatedAt": "2019-03-13T12:04:20.911Z",
        "__v": 0
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    status must be 'pending', 'approved' or 'rejected'
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function create(req, res) {
  try {
    var correction = _lodash2.default.pick(req.body, "filesStaging", "document", "description");

    if (!(correction.filesStaging && correction.document)) return res.status(400).json({
      error: "missing body params"
    });

    var document = await _models.Document.findOne({
      _id: correction.document
    });
    if (!document) return res.status(400).json({
      error: "wrong document id"
    });

    correction.title = "Corrigé de " + document.title;
    correction.status = "pending";
    correction.user = req.user._id;

    correction = await _models.Correction.create(correction);

    correction = correction.toJSON();
    delete correction.filesStaging;

    return res.json(correction);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({
      error: error.message
    });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {put} /corrections/:id Update a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "filesStaging": ["https://igc.tn/img/portfolio/HC1-Prev.jpg", "https://igc.tn/img/portfolio/A2-Prev.jpg"],
 *      "document": "5c41b2d82383c111b4ffad1a",
 *      "description": "Correction Correction Correction Correction"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "_id": "5c88f1c4719c206b4524de83",
        "deleted": false,
        "document": "5c41b2d82383c111b4ffad1a",
        "title": "corrigé de EX physique 2015",
        "user": "5c8783b34a35cd28fa5bea3b",
        "createdAt": "2019-03-13T12:04:20.911Z",
        "updatedAt": "2019-03-13T12:04:20.911Z",
        "__v": 0
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    wrong document id
 *    wrong correction status
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    var correction = await _models.Correction.findOne({
      _id: req.params.id
    });

    if (!correction) return res.status(400).json({
      error: "Correction not found !"
    });

    if (req.body.title) correction.title = req.body.title;

    if (req.body.document) {
      var document = await _models.Document.findOne({
        _id: req.body.document
      });
      if (!document) return res.status(400).json({
        error: "wrong document id"
      });

      correction.document = req.body.document;
    }

    if (req.body.filesStaging) {
      correction.filesStaging = req.body.filesStaging;
    }

    if (req.body.status) {
      var _document = await _models.Document.findOne({
        _id: correction.document
      });

      if (!["pending", "approved", "rejected"].includes(req.body.status)) return res.status(400).json({
        error: "wrong correction status"
      });

      if (!_document.hasCorrection && req.body.status == "approved") {
        _document.hasCorrection = true;
        await _document.save();
      }

      if (correction.status != "approved" && req.body.status == "approved") {
        if (correction.stagingFilesType == 'images') correction.filePath = createPDF(correction.filesStaging, correction.title);else if (correction.stagingFilesType == 'pdfs') {
          correction.filePath = await mergePDFs(correction.filesStaging, correction.title);
        }
      }

      if (["pending", "rejected"].includes(req.body.status)) {
        var corrections = await _models.Correction.find({
          document: correction.document,
          status: "approved"
        });
        if (corrections.length == 1) {
          _document.hasCorrection = false;
          await _document.save();
        }
      }

      correction.status = req.body.status;
    }

    correction.verifiedByProf = req.body.verifiedByProf;
    correction.description = req.body.description;

    await correction.save();

    return res.json(correction);
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") return res.status(400).json({
      error: error.message
    });

    return res.status(500).end();
  }
}

/**
 * @api {delete} /corrections/:id Delete a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function remove(req, res) {
  try {
    var correction = await _models.Correction.findOne({
      _id: req.params.id
    });

    await _models.Correction.delete({
      _id: req.params.id
    });

    var corrections = await _models.Correction.find({
      document: correction.document,
      status: "approved"
    });

    if (corrections.length == 0) await _models.Document.update({
      _id: correction.document
    }, {
      $set: {
        hasCorrection: false
      }
    });

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") return res.status(400).json({
      error: error.message
    });

    return res.status(500).end();
  }
}

async function getByUser(req, res) {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Empty user ID" });
    }
    var corrections = await _models.Correction.find({
      user: req.params.userId
    });

    return res.status(200).json(corrections);
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") return res.status(400).json({ error: error.message });

    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/approved/bySubject/:subjectId Get approved corrections by subject id
 * @apiGroup Corrections
 * @apiParam {id} id Subejct id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAllApprovedBySubject(req, res) {
  try {

    var corrections = await _models.Correction.find({
      status: "approved"
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).populate({
      path: "document",
      populate: {
        path: "subject",
        select: "_id name"
      }
    });

    var result = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = corrections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var correction = _step.value;


        if (!correction.document) continue;

        console.log(correction.document.subject._id);
        console.log(req.params.subjectId);

        if (correction.document.subject._id == req.params.subjectId) {
          correction = correction.toJSON();
          delete correction.document;
          result.push(correction);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/pending/bySubject/:subjectId Get pending corrections by subject id
 * @apiGroup Corrections
 * @apiParam {id} id Subejct id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAllPendingBySubject(req, res) {
  try {

    var corrections = await _models.Correction.find({
      status: "pending"
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).populate({
      path: "document",
      populate: {
        path: "subject",
        select: "_id name"
      }
    });

    var result = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = corrections[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var correction = _step2.value;


        if (!correction.document) continue;

        console.log(correction.document.subject._id);
        console.log(req.params.subjectId);

        if (correction.document.subject._id == req.params.subjectId) {
          correction = correction.toJSON();
          delete correction.document;
          result.push(correction);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/pending/byDocument/:documentId Get pending corrections by document id
 * @apiGroup Corrections
 * @apiParam {id} id Document id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAllPendingByDocument(req, res) {
  try {

    var corrections = await _models.Correction.find({
      status: "pending"
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    });

    var result = [];

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = corrections[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var correction = _step3.value;


        if (!correction.document) continue;

        if (correction.document._id == req.params.documentId) {
          correction = correction.toJSON();
          delete correction.document;
          result.push(correction);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

function createPDF(files, title) {

  var content = files.map(function (item) {
    return {
      image: _path2.default.join(__dirname, "../../../public", item.replace(_env.HOST, "")),
      width: 595,
      height: 842
    };
  });

  var printer = new _pdfmake2.default();

  var docDefinition = {
    content: content,
    info: {
      title: title,
      author: "Issat Sousse Google Club"
    },
    pageMargins: [0, 0, 0, 0]
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(_fs2.default.createWriteStream(_path2.default.join(__dirname, "../../../public/pdfs/" + title + ".pdf")), {
    encoding: "utf16"
  });

  pdfDoc.end();

  var filePath = "https://api.facservice.tn/pdfs/" + title + ".pdf";

  return filePath;
}

async function mergePDFs(files, title) {

  files = files.map(function (item) {
    return _path2.default.join(__dirname, "../../../public", item.replace(_env.HOST, ""));
  });

  await (0, _easyPdfMerge2.default)(files, _path2.default.join(__dirname, "../../../public/pdfs/" + title + ".pdf"), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Successfully merged!');
  });

  var filePath = "https://api.facservice.tn/pdfs/" + title + ".pdf";

  return filePath;
}