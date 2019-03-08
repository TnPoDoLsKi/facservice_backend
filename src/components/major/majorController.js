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
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

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

    const major = await Major.findById({ _id: req.params.id })

    return res.json(major);

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

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

    const major = await Major.findOne({ name: req.params.name })

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

    let major = await Major.findOne({ _id: req.params.id });

    if (!major)
      return res.status(401).json({
        error: "Major not found "
      });

    if (req.body.name)
      major.name = req.body.name;

    if (req.body.description)
      major.description = req.body.description;

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
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

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

    await Major.delete({_id: req.params.id});

    return res.status(200).end();
    
  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}
