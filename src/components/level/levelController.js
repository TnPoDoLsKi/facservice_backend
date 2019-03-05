import _ from "lodash";
import { Level, Formation } from "../../config/models";

/**
 * @api {post} /levels Create a level
 * @apiGroup Levels
 * @apiParam {String} name Level name
 * @apiParam {String} description Level description
 * @apiParam {String} formation Level formation(ID)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "name": "1",
 *      "description": "1ere année",
 *      "formation": "5c5080a2bb95dc104b9934b3"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "_id": "5c5080a2bb95dc104b9934b3",
        "name": "1",
        "description": "1ere année",
        "formation": "5c5080a2bb95dc104b9934b3",
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    }
 * @apiErrorExample {json} Level already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Name and Description are required
 *    HTTP/1.1 400 Internal Server Error
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "description is required !"
      });

    if (!req.body.formation)
      return res.status(400).json({
        error: "formation is required !"
      });

    const formation = await Formation.findOne({ _id: req.body.formation });

    if (!formation)
      return res.status(400).json({
        error: "wrong formation id !"
      });

    const level = await Level.create(req.body);

    return res.json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /levels Get all levels
 * @apiGroup Levels
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "_id": "5c3e21856891a52950272390",
        "name": "2",
        "description": "2eme année",
        "formation": "5c3e21856891a5295027238f",
        "createdAt": "2019-01-15T18:08:05.242Z",
        "updatedAt": "2019-01-15T18:08:05.242Z"
    },
    {
        "_id": "5c3e21856891a5295027238f",
        "name": "1",
        "description": "1ere année",
        "formation": "5c3e21856891a5295027238f",
        "createdAt": "2019-01-15T18:08:05.241Z",
        "updatedAt": "2019-01-15T18:08:05.241Z"
    },
    {
        "_id": "5c3e21856891a52950272391",
        "name": "3",
        "description": "3eme année",
        "formation": "5c3e21856891a5295027238f",
        "createdAt": "2019-01-15T18:08:05.242Z",
        "updatedAt": "2019-01-15T18:08:05.242Z"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function getAll(req, res) {
  try {
    const levels = await Level.find();

    return res.json(levels);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /levels/:id Get one level
 * @apiGroup Levels
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "_id": "5c3e21856891a52950272390",
    "name": "A2",
    "description": "2eme année",
    "createdAt": "2019-01-15T18:08:05.242Z",
    "updatedAt": "2019-01-15T18:08:05.242Z"
}
 * @apiErrorExample {json} Level id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "id cannot be empty"
      });

    const level = await Level.findById({
      _id: req.params.id
    });

    return res.json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /levels Update a level
 * @apiGroup Levels
 * @apiParam {id} id Level id
 * @apiParam {String} name Level name
 * @apiParam {String} description Level description
 * @apiParam {String} formation Level formation(ID)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 * {
 *      "name": "A2",
        "description": "2eme année"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Updated
 * @apiErrorExample {json} Name and Description are required
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Level not found
 *    HTTP/1.1 401 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function update(req, res) {
  try {

    const level = await Level.findOne({ _id: req.params.id });
    if (!level)
      return res.status(401).json({
        error: "level not found !"
      });

    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "description is required !"
      });

    if (!req.body.formation)
      return res.status(400).json({
        error: "formation is required !"
      });

    const formation = await Formation.findOne({ _id: req.body.formation });

    if (!formation)
      return res.status(400).json({
        error: "wrong formation id !"
      });

    level.description = req.body.description;
    level.name = req.body.name;
    level.formation = req.body.formation;

    await level.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {delete} /levels Delete a level
 * @apiGroup Levels
 * @apiParam {id} id level id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Level id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function remove(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "id cannot be empty"
      });
      
    const level = await Level.deleteOne({
      _id: req.params.id
    });

    return res.json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
