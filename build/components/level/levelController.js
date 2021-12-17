"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getByFormation = getByFormation;
exports.getOne = getOne;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {post} /levels Create a level
 * @apiGroup Levels
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "1er",
 *      "description": "level description",
 *      "formation" : "5c825dee263bbd33636897f4"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "deleted": false,
        "_id": "5c8267d27c8e2f4013c69a27",
        "description": "level description",
        "name": "1er",
        "formation": "5c8263677c8e2f4013c6986f",
        "createdAt": "2019-03-08T12:35:32.637Z",
        "updatedAt": "2019-03-08T12:44:37.914Z",
        "__v": 0
    }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    name is required !
 *    formation is required !
 *    wrong formation id !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function create(req, res) {
  try {
    if (!req.body.name) return res.status(400).json({
      error: "name is required !"
    });

    if (!req.body.formation) return res.status(400).json({
      error: "formation is required !"
    });

    var formation = await _models.Formation.findOne({ _id: req.body.formation });

    if (!formation) return res.status(400).json({
      error: "wrong formation id !"
    });

    var level = await _models.Level.create(req.body);

    return res.json(level);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

async function getAll(req, res) {
  try {
    var levels = await _models.Level.find();

    return res.json(levels);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /levels/byFormation/:formation Get levels by formation
 * @apiGroup Levels
 * @apiParam {id} formation formation id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
  [
    {
        "deleted": false,
        "_id": "5c826194157314398aa8c05e",
        "description": "level description",
        "name": "2er",
        "formation": "5c8263677c8e2f4013c6986f",
        "createdAt": "2019-03-08T12:35:32.637Z",
        "updatedAt": "2019-03-08T12:44:37.914Z",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8267d27c8e2f4013c69a27",
        "description": "level description",
        "name": "1er",
        "formation": "5c8263677c8e2f4013c6986f",
        "createdAt": "2019-03-08T12:35:32.637Z",
        "updatedAt": "2019-03-08T12:44:37.914Z",
        "__v": 0
    }
  ]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    wrong formation id
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getByFormation(req, res) {
  try {
    var formation = await _models.Formation.findOne({ _id: req.params.formation });

    if (!formation) return res.status(400).json({ error: "wrong formation id" });

    var levels = await _models.Level.find({ formation: req.params.formation });

    return res.json(levels);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

async function getOne(req, res) {
  try {
    var level = await _models.Level.findById({
      _id: req.params.id
    });

    return res.json(level);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /levels/id Update a level
 * @apiGroup Levels
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "name": "1er",
 *      "description": "level description",
 *      "formation" : "5c825dee263bbd33636897f4"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    level not found !
 *    wrong formation id
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    var level = await _models.Level.findOne({ _id: req.params.id });
    if (!level) return res.status(400).json({
      error: "level not found !"
    });

    if (req.body.name) level.name = req.body.name;

    // if (req.body.description) to allow null value 
    level.description = req.body.description;

    if (req.body.formation) {
      var formation = await _models.Formation.findOne({ _id: req.body.formation });

      if (!formation) return res.status(400).json({
        error: "wrong formation id "
      });

      level.formation = req.body.formation;
    }

    await level.save();

    return res.json(level);
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {delete} /levels/id Delete a level
 * @apiGroup Levels
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    level not found !
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function remove(req, res) {
  try {
    await _models.Level.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}