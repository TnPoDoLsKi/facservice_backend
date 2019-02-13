import _ from "lodash";
import { Document, Subject } from "../../config/models";

/**
 * @api {post} /subjects Create a subject
 * @apiGroup Subjects
 * @apiParam {String} name Subject name
 * @apiParam {String} semestre Subject semestre(1 or 2)
 * @apiParam {String} major Subject major(id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "semestre": 1,
        "name": "Mathématiques discrètes",
        "major": "5c50a4d00712811970128921"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "_id": "5c5080a2bb95dc104b9934b3",
        "semestre": 1,
        "name": "Mathématiques discrètes",
        "major": "5c50a4d00712811970128921"
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    }
 * @apiErrorExample {json} Subject already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Name, Description and Major are required
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
    let subject = _.pick(req.body, "name", "description");

    subject = await Subject.create(subject);

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /subjects Get all subjects
 * @apiGroup Subjects
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "semestre": 1,
        "documents": [],
        "_id": "5c3e3542077225388404c0d8",
        "name": "Mathématiques discrètes",
        "createdAt": "2019-01-15T19:32:18.963Z",
        "updatedAt": "2019-01-15T19:32:18.963Z"
    },
    {
        "semestre": 1,
        "documents": [],
        "_id": "5c3e3542077225388404c0d9",
        "name": "Probabilité et Statistiques",
        "createdAt": "2019-01-15T19:32:18.963Z",
        "updatedAt": "2019-01-15T19:32:18.963Z"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function getAll(req, res) {
  try {
    const subject = await Subject.find();

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /subjects/:id Get one Subject
 * @apiGroup Subjects
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "semestre": 1,
    "documents": [],
    "_id": "5c3e3542077225388404c0d8",
    "name": "Mathématiques discrètes",
    "createdAt": "2019-01-15T19:32:18.963Z",
    "updatedAt": "2019-01-15T19:32:18.963Z"
* }
 * @apiErrorExample {json} Subject id cannot be empty
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

    const subject = await Subject.findById({
      _id: req.params.id
    });

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /subjects Update a Subject
 * @apiGroup Subjects
 * @apiParam {id} id Subject id
 * @apiParam {String} name Subject name
 * @apiParam {String} description Subject description
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 * {
 *      "name": "II",
        "description": "Informatique Industrielle",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Updated
 * @apiErrorExample {json} Name and Description are required
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Subject not found
 *    HTTP/1.1 401 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function update(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "description is required !"
      });

    const subject = await Subject.findOne({
      _id: req.params.id
    });
    if (!subject)
      return res.status(401).json({
        error: "subject not found !"
      });

    subject.description = req.body.description;
    subject.name = req.body.name;

    await subject.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {delete} /subjects Delete a subject
 * @apiGroup Subjects
 * @apiParam {id} id Subject id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Ssubject id cannot be empty
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
    const subject = await Subject.deleteOne({
      _id: req.params.id
    });

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
