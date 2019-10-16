import _ from "lodash";
import { Major, Level, Subject, Document } from "../../config/models";

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

export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.level)
      return res.status(400).json({
        error: "level is required !"
      });

    const level = await Level.findOne({ _id: req.body.level });

    if (!level)
      return res.status(400).json({
        error: "wrong level id !"
      });

    const major = await Major.create(req.body);

    return res.json(major);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
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

export async function getAll(req, res) {
  try {
    const majors = await Major.find();

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

export async function getAllWithInReviewInfos(req, res) {
  try {

    let result = { totalInReview: 0, majors: [] }
    let majors = await Major.find()

    for (let major of majors) {

      major = major.toJSON()

      let subjects = await Subject.find({
        majors: {
          $in: major._id
        }
      })

      let count = 0
      major.subjects = []

      for (let subject of subjects) {

        subject = subject.toJSON();

        let docments = await Document.find({
          status: 'pending',
          subject: subject._id
        })

        subject.name += ' (' + docments.length + ')'
        count += docments.length
        major.subjects.push(_.pick(subject, '_id', 'name'))
      }

      major.name += ' (' + count + ')'
      result.totalInReview += count

      result.majors.push(_.pick(major, '_id', 'name', 'subjects'))
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

export async function getByLevel(req, res) {
  try {
    const level = await Level.findOne({ _id: req.params.level });

    if (!level)
      return res.status(400).json({
        error: "wrong level id"
      });

    const majors = await Major.find({ level: req.params.level });

    return res.json(majors);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {
    const major = await Major.findById({ _id: req.params.id });

    return res.json(major);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

export async function getOneByName(req, res) {
  try {
    const major = await Major.findOne({ name: req.params.name });

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

export async function update(req, res) {
  try {
    let major = await Major.findOne({ _id: req.params.id });

    if (!major)
      return res.status(400).json({
        error: "Major not found "
      });

    if (req.body.name) major.name = req.body.name;

    if (req.body.description) major.description = req.body.description;

    if (req.body.level) {
      const level = await Level.findOne({ _id: req.body.level });

      if (!level)
        return res.status(400).json({
          error: "wrong level id !"
        });

      major.level = req.body.level;
    }

    await major.save();
    return res.status(200).end();
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
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

export async function remove(req, res) {
  try {
    await Major.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}
