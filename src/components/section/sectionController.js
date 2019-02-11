import _ from "lodash";
import Section from "./section";

/**
 * @api {post} /sections Create a section
 * @apiGroup Sections
 * @apiParam {String} name Section name
 * @apiParam {String} description Section description
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "name" : "II",
        "description" : "Informatique Industrielle",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
        "_id": "5c5080a2bb95dc104b9934b3",
        "name" : "II",
        "description" : "Informatique Industrielle",
        "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
    }
 * @apiErrorExample {json} Section already exists
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

    let section = _.pick(req.body, "name", "description");

    section = await Section.create(section);

    return res.json(section);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /sections Get all sections
 * @apiGroup Sections
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "_id": "5c3e21bf08b93b3754f05779",
        "name": "II",
        "description": "Informatique Industrielle",
        "createdAt": "2019-01-15T18:09:03.601Z",
        "updatedAt": "2019-01-15T18:09:03.601Z"
    },
    {
        "_id": "5c3e21bf08b93b3754f05778",
        "name": "GL",
        "description": "Génie Logicielle",
        "createdAt": "2019-01-15T18:09:03.600Z",
        "updatedAt": "2019-01-15T18:09:03.600Z"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const section = await Section.find();

    return res.json(section);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /section/:id Get one Section
 * @apiGroup Sections
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "_id": "5c3e21bf08b93b3754f05779",
    "name": "II",
    "description": "Informatique Industrielle",
    "createdAt": "2019-01-15T18:09:03.601Z",
    "updatedAt": "2019-01-15T18:09:03.601Z"
}
 * @apiErrorExample {json} Section id cannot be empty
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

    const section = await Section.findById({
      _id: req.params.id
    });

    return res.json(section);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /sections Update a Section
 * @apiGroup Sections
 * @apiParam {id} id Section id
 * @apiParam {String} name Section name
 * @apiParam {String} description Section description
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
 * @apiErrorExample {json} Section not found
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

    const section = await Section.findOne({
      _id: req.params.id
    });
    if (!section)
      return res.status(400).json({
        error: "section not found !"
      });

    section.description = req.body.description;
    section.name = req.body.name;

    await section.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {delete} /sections Delete a section
 * @apiGroup Sections
 * @apiParam {id} id Section id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Section id cannot be empty
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
    const section = await Section.deleteOne({
      _id: req.params.id
    });

    return res.json(section);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
