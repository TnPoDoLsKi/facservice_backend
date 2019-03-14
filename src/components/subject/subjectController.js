import _ from "lodash";
import { Subject, Major } from "../../config/models";

export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (req.body.semestre && (req.body.semestre != 1 && req.body.semestre != 2))
      return res.status(400).json({
        error: "semestre must be 1 or 2"
      });

    if (!req.body.majors || !Array.isArray(req.body.majors))
      return res.status(400).json({
        error: "majors is required as an array!"
      });

    let subject = _.pick(req.body, "name", "description", "semestre", "majors");

    for (let major of subject.majors) {
      major = await Major.findOne({ _id: major });
      if (!major)
        return res.status(400).json({
          error: "wrong major id !"
        });
    }

    subject = await Subject.create(subject);

    return res.json(subject);

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
    console.log(error);

    return res.status(500).end();
  }
}

export async function getAll(req, res) {
  try {
    const subject = await Subject.find();

    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {

    const subject = await Subject.findById({ _id: req.params.id });
    return res.json(subject);

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
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

export async function getByMajor(req, res) {
  try {

    let subjects = await Subject.find({
      majors: {
        $in: req.params.id
      }
    }).select('-majors')

    return res.json(subjects);

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
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

export async function getByMajors(req, res) {
  try {

    let subjects = await Subject.find({
      majors: {
        $all: req.body.majors
      }
    }).select('-majors')

    return res.json(subjects);

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
    console.log(error);

    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {

    let subject = await Subject.findOne({ _id: req.params.id });
    if (!subject)
      return res.status(401).json({
        error: "subject not found !"
      });

    if (req.body.name)
      subject.name = req.body.name;

    if (req.body.description)
      subject.description = req.body.description;

    if (req.body.semestre) {
      if (req.body.semestre != 1 && req.body.semestre != 2)
        return res.status(400).json({
          error: "semestre must be 1 or 2"
        });

      subject.semestre = req.body.semestre;
    }

    if (req.body.majors) {

      for (let major of req.body.majors) {
        major = await Major.findOne({ _id: major });
        if (!major)
          return res.status(400).json({
            error: "wrong major id !"
          });
      }

      subject.majors = req.body.majors;
    }

    await subject.save();

    return res.status(200).end();

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
    console.log(error);

    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {

    await Subject.delete({ _id: req.params.id }, req.user._id);
    return res.status(200).end();

  } catch (error) {
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
    console.log(error);

    return res.status(500).end();
  }
}
