"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getAllWithInReviewInfos = getAllWithInReviewInfos;
exports.getByLevel = getByLevel;
exports.getOne = getOne;
exports.getOneByName = getOneByName;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {post} /majors Create a major
 * @apiGroup Majors
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "LFSI 1",
 *      "description": "major description",
 *      "level" : "5c825dee263bbd33636897f4"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "deleted": false,
        "_id": "5c82650d1227833d35ac2a29",
        "description": "major description",
        "name": "LFSI 1",
        "level": "5c825dee263bbd33636897f4",
        "__v": 0
    }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    name is required !
 *    level is required !
 *    wrong level id !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function create(req, res) {
  try {
    if (!req.body.name) return res.status(400).json({
      error: "name is required !"
    });

    if (!req.body.level) return res.status(400).json({
      error: "level is required !"
    });

    var level = await _models.Level.findOne({ _id: req.body.level });

    if (!level) return res.status(400).json({
      error: "wrong level id !"
    });

    var major = await _models.Major.create(req.body);

    return res.json(major);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {get} /majors/ Get all majors
 * @apiGroup Majors
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "deleted": false,
        "_id": "5c82650d1227833d35ac2a29",
        "description": "major description",
        "name": "LFSI 1",
        "level": "5c8267d27c8e2f4013c69a27",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8265367e19d73dba8355a6",
        "name": "Prepa 2",
        "description": "major description",
        "level": "5c826194157314398aa8c05e",
        "__v": 0
    }
]
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAll(req, res) {
  try {
    var majors = await _models.Major.find();

    return res.json(majors);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /majors/withInReviewInfos Get all majors with in review infos
 * @apiGroup Majors
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
{
    "totalInReview": 55,
    "majors": [
        {
          "_id": "5c8922106b5a61762e227a9a",
          "name": "FIA2-II (24)",
          "subjects": [
              {
                  "_id": "5c892b526ffe7e798d20b3d8",
                  "name": "Théorie des files d'attente (5)"
              },
              {
                  "_id": "5c892b776ffe7e798d20b3d9",
                  "name": "Francais 4 (14)"
              },
              {
                  "_id": "5c892b7d6ffe7e798d20b3da",
                  "name": "Anglais 4 (5)"
              },
              {
                  "_id": "5cc222635f4457320f0fe02a",
                  "name": "Securitè Logicielle (0)"
              }
          ]
        },
        {
          "_id": "5c89222c6b5a61762e227a9b",
          "name": "FIA3-GL (0)",
          "subjects": [
              {
                  "_id": "5cc222635f4457320f0fe02a",
                  "name": "Securitè Logicielle (0)"
              }
          ]
        }
    ]
}
]
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAllWithInReviewInfos(req, res) {
  try {

    var result = { totalInReview: 0, majors: [] };
    var majors = await _models.Major.find();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = majors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var major = _step.value;


        major = major.toJSON();

        var subjects = await _models.Subject.find({
          majors: {
            $in: major._id
          }
        });

        var count = 0;
        major.subjects = [];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = subjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var subject = _step2.value;


            subject = subject.toJSON();

            var docments = await _models.Document.find({
              status: 'pending',
              subject: subject._id
            });

            subject.name += ' (' + docments.length + ')';
            count += docments.length;
            major.subjects.push(_lodash2.default.pick(subject, '_id', 'name'));
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

        major.name += ' (' + count + ')';
        result.totalInReview += count;

        result.majors.push(_lodash2.default.pick(major, '_id', 'name', 'subjects'));
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
 * @api {get} /majors/byLevel/:level Get majors by level
 * @apiGroup Majors
 * @apiParam {id} level level id 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "deleted": false,
        "_id": "5c82650d1227833d35ac2a29",
        "description": "major description",
        "name": "LFSI 1",
        "level": "5c8267d27c8e2f4013c69a27",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8265367e19d73dba8355a6",
        "name": "Prepa 2",
        "description": "major description",
        "level": "5c826194157314398aa8c05e",
        "__v": 0
    }
]
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 *    wrong level id
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getByLevel(req, res) {
  try {
    var level = await _models.Level.findOne({ _id: req.params.level });

    if (!level) return res.status(400).json({
      error: "wrong level id"
    });

    var majors = await _models.Major.find({ level: req.params.level });

    return res.json(majors);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

async function getOne(req, res) {
  try {
    var major = await _models.Major.findById({ _id: req.params.id });

    return res.json(major);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

async function getOneByName(req, res) {
  try {
    var major = await _models.Major.findOne({ name: req.params.name });

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /majors/:id Update a major
 * @apiGroup Majors
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "LFSI 1",
 *      "description": "major description",
 *      "level" : "5c825dee263bbd33636897f4"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    Major not found
 *    wrong level id !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    var major = await _models.Major.findOne({ _id: req.params.id });

    if (!major) return res.status(400).json({
      error: "Major not found "
    });

    if (req.body.name) major.name = req.body.name;

    // if (req.body.description) to allow null value 
    major.description = req.body.description;

    if (req.body.level) {
      var level = await _models.Level.findOne({ _id: req.body.level });

      if (!level) return res.status(400).json({
        error: "wrong level id !"
      });

      major.level = req.body.level;
    }

    await major.save();
    return res.json(major);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {delete} /majors/:id Delete a major
 * @apiGroup Majors
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    Major not found
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function remove(req, res) {
  try {
    await _models.Major.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}