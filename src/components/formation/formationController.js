import _ from "lodash";
import { Formation } from "../../config/models";

/**
 * @api {post} /formations Create a formation
 * @apiGroup Formations
 * @apiParam {String} name Formation name
 * @apiParam {String} description Formation description
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "name": "LFSI",
 *      "description": "Licence Fondamentale en Sciences de l'informatique"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "_id": "5c5080a2bb95dc104b9934b3",
        "name": "LFSI",
        "description": "Licence Fondamentale en Sciences de l'informatique",
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    }
 * @apiErrorExample {json} Formation already exists
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

    const formation = await Formation.create(req.body);

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
 * [
    {
        "_id": "5c5080a2bb95dc104b9934ae",
        "name": "LaGm",
        "description": "Licence Appliquée en Génie Mécanique",
        "createdAt": "2019-01-29T16:34:42.202Z",
        "updatedAt": "2019-01-29T16:34:42.202Z"
    },
    {
        "_id": "5c5080a2bb95dc104b9934b3",
        "name": "LFSI",
        "description": "Licence Fondamentale en Sciences de l'informatique",
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    },
    {
        "_id": "5c5080a2bb95dc104b9934b2",
        "name": "LaEm",
        "description": "Licence Appliquée en Electromécanique",
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    }
  ]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function getAll(req, res) {
  try {
    const formations = await Formation.find();

    return res.json(formations);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /formations/:id Get one formation
 * @apiGroup Formations
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "_id": "5c5080a2bb95dc104b9934ac",
    "name": "Prepa",
    "description": "Préparatoire",
    "createdAt": "2019-01-29T16:34:42.202Z",
    "updatedAt": "2019-01-29T16:34:42.202Z"
}
 * @apiErrorExample {json} Formation id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getOne(req, res) {
  try {
    const formation = await Formation.findById({
      _id: req.params.id
    });

    return res.json(formation);
  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {put} /formations Update a formation
 * @apiGroup Formations
 * @apiParam {id} id formation id
 * @apiParam {String} name Formation name
 * @apiParam {String} description Formation description
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 * {
 *      "name": "LFSI",
 *      "description": "Licence Fondamentale en Sciences de l'informatique"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Updated
 * @apiErrorExample {json} Name and Description are required
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Formation not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function update(req, res) {
  try {

    let formation = await Formation.findOne({
      _id: req.params.id
    });

    if (!formation)
      return res.status(404).json({
        error: "formation not found !"
      });

    if (req.body.description)
      formation.description = req.body.description;

    if (req.body.name)
      formation.name = req.body.name;

    await formation.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {delete} /formations Delete a formation
 * @apiGroup Formations
 * @apiParam {id} id formation id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Formation id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function remove(req, res) {
  try {
    await Formation.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
    
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
