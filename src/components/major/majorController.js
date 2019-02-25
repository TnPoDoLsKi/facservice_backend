import _ from "lodash";
import { Major, Level, Formation, Section, Subject } from "../../config/models";

/**
 * @api {post} /majors Create a major
 * @apiGroup Majors
 * @apiParam {String} name Major name
 * @apiParam {String} description Major description
 * @apiParam {String} formation Major formation(id)
 * @apiParam {String} level Major level(id)
 * @apiParam {String} section Major section(id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "name": "FIA1",
 *      "description": "1ere années formation d'ingénieur",
 *      "formation": "5c3e21d118e59b3ce40c808b",
 *      "level": "5c3e21856891a52950272390"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *      "name": "FIA1",
 *      "description": "1ere années formation d'ingénieur",
 *      "formation": "5c3e21d118e59b3ce40c808b",
 *      "level": "5c3e21856891a52950272390",
 *      "createdAt": "2019-01-29T16:34:42.203Z",
        "updatedAt": "2019-01-29T16:34:42.203Z"
 *    }
 * @apiErrorExample {json} Major already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Name, Description, Formation, Level and Section are required
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

    if (!req.body.level)
      return res.status(400).json({
        error: "level is required !"
      });

    if (!req.body.section)
      return res.status(400).json({
        error: "section is required !"
      });
    let major = _.pick(req.body, "name", "description");
    await Formation.findOne(
      {
        name: req.body.formation
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.formation = found._id;
        }
      }
    );
    await Level.findOne(
      {
        name: req.body.level
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.level = found._id;
        }
      }
    );
    await Section.findOne(
      {
        name: req.body.section
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.section = found._id;
        }
      }
    );
    major = await Major.create(major);
    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /majors Get all majors
 * @apiGroup Majors
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "subjects": [
            {
                "semestre": 1,
                "documents": [],
                "_id": "5c3e3542077225388404c0df",
                "name": "Fondements des systèmes d'exploitation",
                "createdAt": "2019-01-15T19:32:18.964Z",
                "updatedAt": "2019-01-15T19:32:18.964Z"
            },
            {
                "semestre": 1,
                "documents": [],
                "_id": "5c3e3542077225388404c0e0",
                "name": "Création d'entreprises et innovation",
                "createdAt": "2019-01-15T19:32:18.964Z",
                "updatedAt": "2019-01-15T19:32:18.964Z"
            }
        ],
        "_id": "5c50a4d00712811970128921",
        "name": "FIA1",
        "description": "1ere année Formation d'Ingénieur",
        "formation": {
            "_id": "5c3e21d118e59b3ce40c808b",
            "name": "FI",
            "description": "Fomation d'Ingénieur",
            "createdAt": "2019-01-15T18:09:21.969Z",
            "updatedAt": "2019-01-15T18:09:21.969Z"
        },
        "level": {
            "_id": "5c3e21856891a52950272390",
            "name": "A2",
            "description": "2eme année",
            "createdAt": "2019-01-15T18:08:05.242Z",
            "updatedAt": "2019-01-15T18:08:05.242Z"
        }
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const majors = await Major.find()
      .select("-formation -level -section")
      .populate("subjects")
      .exec();

    return res.json(majors);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /majors/:id Get one major
 * @apiGroup Majors
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "subjects": [
        {
            "semestre": 1,
            "documents": [],
            "_id": "5c3e3542077225388404c0ed",
            "name": "Programmation Web",
            "createdAt": "2019-01-15T19:32:18.964Z",
            "updatedAt": "2019-01-15T19:32:18.964Z"
        }
    ],
    "_id": "5c50a4d00712811970128922",
    "name": "FIA2-II",
    "description": "2eme année Formation d'Ingénieur: Informatique Industrielle",
    "formation": {
        "_id": "5c3e21d118e59b3ce40c808b",
        "name": "FI",
        "description": "Fomation d'Ingénieur",
        "createdAt": "2019-01-15T18:09:21.969Z",
        "updatedAt": "2019-01-15T18:09:21.969Z"
    },
    "level": {
        "_id": "5c3e21856891a5295027238f",
        "name": "A1",
        "description": "1ere année",
        "createdAt": "2019-01-15T18:08:05.241Z",
        "updatedAt": "2019-01-15T18:08:05.241Z"
    }
}
 * @apiErrorExample {json} Major id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Major ID cannot be empty"
      });

    const major = await Major.findById({
      _id: req.params.id
    })
      .select("-formation -level -section")
      .populate("subjects")
      .exec();

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /major Get one major by name
 * @apiGroup Majors
 * @apiParam {String} name Major name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "_id": "5c6199dff134a742549ed42a",
    "name": "FIA2-II",
    "description": "2eme année Formation d'Ingénieur: Informatique Industrielle",
    "subjects": [
        {
            "semestre": 1,
            "documents": [],
            "_id": "5c6199dff134a742549ed40d",
            "name": "Sécurité des réseaux",
            "createdAt": "2019-02-11T15:50:55.588Z",
            "updatedAt": "2019-02-11T15:50:55.588Z",
        }
    ],
}
 * @apiErrorExample {json} Major name cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getOneByName(req, res) {
  try {
    if (!req.query.name)
      return res.status(400).json({
        error: "Major Name cannot be empty"
      });

    const major = await Major.findOne({
      name: req.query.name
    })
      .select("-formation -level -section")
      .populate({ path: "subjects", select: "-documents" })
      .exec();

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /majors/:id Update a major
 * @apiGroup Majors
 * @apiParam {id} id Major id
 * @apiParam {String} name Major name
 * @apiParam {String} description Major description
 * @apiParam {String} formation Major formation
 * @apiParam {String} level Major description
 * @apiParam {String} section Major description
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 * {
 *      "name": "FIA1",
 *      "description": "1ere années formation d'ingénieur",
 *      "formation": "5c3e21d118e59b3ce40c808b",
 *      "level": "5c3e21856891a52950272390"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Updated
 * @apiErrorExample {json} Name and Description are required
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Major not found
 *    HTTP/1.1 401 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function update(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "Major name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "Major description is required !"
      });

    const NewMajor = _.pick(req.body, "name", "description");
    if (req.body.formation)
      await Formation.findOne(
        {
          name: req.body.formation
        },
        (err, found) => {
          if (err) {
            return res.status(400).end();
          } else {
            NewMajor.formation = found._id;
          }
        }
      );
    if (req.body.level)
      await Level.findOne(
        {
          name: req.body.level
        },
        (err, found) => {
          if (err) {
            return res.status(400).end();
          } else {
            NewMajor.level = found._id;
          }
        }
      );
    if (req.body.section)
      await Section.findOne(
        {
          name: req.body.section
        },
        (err, found) => {
          if (err) {
            return res.status(400).end();
          } else {
            NewMajor.section = found._id;
          }
        }
      );

    let major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(401).json({
        error: "Major not found !"
      });

    major.description = NewMajor.description;
    major.name = NewMajor.name;
    major.formation = NewMajor.formation;
    major.level = NewMajor.level;
    major.section = NewMajor.section;

    await major.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {delete} /majors/:id Delete a major
 * @apiGroup Majors
 * @apiParam {id} id Major id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Major id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function remove(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Major id cannot be empty"
      });
    const major = await Major.deleteOne({
      _id: req.params.id
    });

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {post} /majors/:id/subjects Add subjects to a major
 * @apiGroup Majors
 * @apiParam {String} subject Major subject(id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "subject" : "5c3e3542077225388404c0d8"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 Added
 * @apiErrorExample {json} Major or Subject not found
 *    HTTP/1.1 400 Internal Server Error
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function addSubjects(req, res) {
  try {
    const major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(400).json({
        error: "major not found !"
      });

    if (!req.body.subject)
      return res.status(400).json({
        error: "Subject is required !"
      });

    const subject = await Subject.findOne({
      name: req.body.SubjectName
    });

    if (!subject)
      return res.status(500).json({
        error: "subject not found !"
      });

    await major.subjects.push(subject._id);

    await major.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
