"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {post} /formations Create a formation
 * @apiGroup Formations
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "Prepa",
 *      "description": "bla bla bla"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "deleted": false,
        "_id": "5c825dee263bbd33636897f4",
        "name": "master",
        "createdAt": "2019-03-08T12:19:58.723Z",
        "updatedAt": "2019-03-08T12:29:24.168Z",
        "__v": 0
    }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    name is required !
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function create(req, res) {
  try {
    if (!req.body.name) return res.status(400).json({
      error: "name is required !"
    });

    var formation = await _models.Formation.create(req.body);

    return res.json(formation);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /formations Get all formations
 * @apiGroup Formations
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
[
    {
        "deleted": false,
        "_id": "5c825dee263bbd33636897f4",
        "name": "master",
        "createdAt": "2019-03-08T12:19:58.723Z",
        "updatedAt": "2019-03-08T12:29:24.168Z",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8263677c8e2f4013c6986f",
        "name": "prepa",
        "createdAt": "2019-03-08T12:19:58.723Z",
        "updatedAt": "2019-03-08T12:29:24.168Z",
        "__v": 0
    }
]
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getAll(req, res) {
  try {
    var formations = await _models.Formation.find();

    return res.json(formations);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

async function getOne(req, res) {
  try {
    var formation = await _models.Formation.findById({
      _id: req.params.id
    });

    return res.json(formation);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {put} /formations/:id Update a formation
 * @apiGroup Formations
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "Prepa",
 *      "description": "bla bla bla"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    formation not found !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    var formation = await _models.Formation.findOne({
      _id: req.params.id
    });

    if (!formation) return res.status(400).json({
      error: "formation not found !"
    });

    // if (req.body.description) to allow null value 
    formation.description = req.body.description;

    if (req.body.name) formation.name = req.body.name;

    await formation.save();

    return res.json(formation);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {delete} /formations/:id Delete a formation
 * @apiGroup Formations
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    formation not found !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function remove(req, res) {
  try {
    await _models.Formation.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}