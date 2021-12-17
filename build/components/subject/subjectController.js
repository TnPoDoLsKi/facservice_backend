"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.getByMajor = getByMajor;
exports.getByMajors = getByMajors;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {post} /subjects Create a subject
 * @apiGroup Subjects
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "physique",
 *      "description": "subject description",
 *      "majors" : ["5c825dee263bbd33636897f4"],
 *      "semestre" : 1
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
      "documentsCount": {
          "DS": 0,
          "EX": 0,
          "C": 0,
          "TD": 0,
          "TP": 0
      },
      "semestre": 2,
      "deleted": false,
      "_id": "5c8269c447baab426f6cbcfc",
      "name": "physique",
      "createdAt": "2019-03-08T13:10:28.761Z",
      "updatedAt": "2019-03-12T22:56:21.620Z",
      "__v": 1,
      "description": "Subject description"
    }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    name is required !
 *    semestre must be 1 or 2
 *    majors is required as an array!
 *    wrong major id !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function create(req, res) {
  try {
    if (!req.body.name) return res.status(400).json({
      error: "name is required !"
    });

    if (req.body.semestre && req.body.semestre != 1 && req.body.semestre != 2) return res.status(400).json({
      error: "semestre must be 1 or 2"
    });

    if (!req.body.majors || !Array.isArray(req.body.majors)) return res.status(400).json({
      error: "majors is required as an array!"
    });

    var subject = _lodash2.default.pick(req.body, "name", "description", "semestre", "majors");

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = subject.majors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var major = _step.value;

        major = await _models.Major.findOne({ _id: major });
        if (!major) return res.status(400).json({
          error: "wrong major id !"
        });
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

    subject = await _models.Subject.create(subject);

    return res.json(subject);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

async function getAll(req, res) {
  try {
    var subject = await _models.Subject.find();

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

async function getOne(req, res) {
  try {
    var subject = await _models.Subject.findById({ _id: req.params.id });
    return res.json(subject);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {get} /subjects/byMajor/:major Get subjects by major
 * @apiGroup Subjects
 * @apiParam {id} major major id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
[
    {
        "documentsCount": {
            "DS": 3,
            "EX": 2,
            "C": 0,
            "TD": 2,
            "TP": 0
        },
        "semestre": 2,
        "deleted": false,
        "_id": "5c8269c447baab426f6cbcfc",
        "name": "physique",
        "createdAt": "2019-03-08T13:10:28.761Z",
        "updatedAt": "2019-03-12T22:56:21.620Z",
        "__v": 1,
        "description": "Subject description"
    },
    {
        "documentsCount": {
            "DS": 0,
            "EX": 9,
            "C": 0,
            "TD": 2,
            "TP": 2
        },
        "semestre": 1,
        "deleted": false,
        "_id": "5c826a05a3bddb42a13118e7",
        "name": "physique",
        "description": "Subject description",
        "createdAt": "2019-03-08T13:11:33.708Z",
        "updatedAt": "2019-03-08T13:11:33.708Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getByMajor(req, res) {
  try {
    var subjects = await _models.Subject.find({
      majors: {
        $in: req.params.id
      }
    });

    return res.json(subjects);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {put} /subjects/GetByMajors/ Get subjects by majors
 * @apiGroup Subjects
 * @apiParamExample {json} Input
 *    {
 *      "majors": ["5c41b2d82383c111b4ffad1a", "5c41b2d82383c111b4ffad1c"],
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
[
    {
        "documentsCount": {
            "DS": 3,
            "EX": 2,
            "C": 0,
            "TD": 2,
            "TP": 0
        },
        "semestre": 2,
        "deleted": false,
        "_id": "5c8269c447baab426f6cbcfc",
        "name": "physique",
        "createdAt": "2019-03-08T13:10:28.761Z",
        "updatedAt": "2019-03-12T22:56:21.620Z",
        "__v": 1,
        "description": "Subject description"
    },
    {
        "documentsCount": {
            "DS": 0,
            "EX": 9,
            "C": 0,
            "TD": 2,
            "TP": 2
        },
        "semestre": 1,
        "deleted": false,
        "_id": "5c826a05a3bddb42a13118e7",
        "name": "physique",
        "description": "Subject description",
        "createdAt": "2019-03-08T13:11:33.708Z",
        "updatedAt": "2019-03-08T13:11:33.708Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getByMajors(req, res) {
  try {
    var subjects = await _models.Subject.find({
      majors: {
        $all: req.body.majors
      }
    }).select("-majors");

    return res.json(subjects);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {put} /subjects/:id Update a subject
 * @apiGroup Subjects
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "physique",
 *      "description": "subject description",
 *      "majors" : ["5c825dee263bbd33636897f4"],
 *      "semestre" : 1
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    subject not found !
 *    semestre must be 1 or 2
 *    majors is required as an array!
 *    wrong major id !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    var subject = await _models.Subject.findOne({ _id: req.params.id });
    if (!subject) return res.status(401).json({
      error: "subject not found !"
    });

    if (req.body.name) subject.name = req.body.name;

    // if (req.body.description) to allow null value 
    subject.description = req.body.description;

    if (req.body.semestre) {
      if (req.body.semestre != 1 && req.body.semestre != 2) return res.status(400).json({
        error: "semestre must be 1 or 2"
      });

      subject.semestre = req.body.semestre;
    }

    if (req.body.majors) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = req.body.majors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var major = _step2.value;

          major = await _models.Major.findOne({ _id: major });
          if (!major) return res.status(400).json({
            error: "wrong major id !"
          });
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

      subject.majors = req.body.majors;
    }

    await subject.save();

    return res.json(subject);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {delete} /subjects/:id Delete a subject
 * @apiGroup Subjects
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    subject not found !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function remove(req, res) {
  try {
    await _models.Subject.delete({ _id: req.params.id }, req.user._id);
    return res.status(200).end();
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}