import _ from "lodash";
import { Correction } from "../../config/models";

/**
 * @api {get} /corrections Get all corrections
 * @apiGroup Corrections
 * @apiSuccess {Number} _id Correction id
 * @apiSuccess {Boolean} approved Whether the correction document is approved by the admin
 * @apiSuccess {Number} score Correction score
 * @apiSuccess {String} title Correction title
 * @apiSuccess {String} filePath Correction file path
 * @apiSuccess {Object} user Correction Owner
 * @apiSuccess {Object} document Correction document
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "approved": false,
        "score": 0,
        "_id": "5c41e6b8f6417937d0a24ace",
        "title": "correction ex 2016",
        "filePath": "/uploads/jdhgfhd.jpg",
        "user": {
            "type": "student",
            "_id": "5c2426542a7e2f361896f812",
            "email": "mohamed@test.com",
            "hashedPassword": "$2b$10$7iOFilgwRN/qoXNA5KJuVuyiofVXvjmVEcn0MVivS4F7ne.vI9MWq",
            "firstName": "mohamed",
            "lastName": "mohamed",
            "major": "5c1fb346e28363333004f02c",
        },
        "document": {
            "type": "EX",
            "semestre": 1,
            "approved": false,
            "NBDowloads": 0,
            "session": "Principale",
            "corrections": [
                "5c41ccd20dbd0934ccc59a0e",
                "5c41cd34dfe31425c014f85e"
            ],
            "_id": "5c41df5e0000d416fc5158fd",
            "title": "EXAlgo",
            "filePath": "/uploads/hjkhdfkjl.pdf",
            "major": "5c3f8bee091f3c3290ac10b2",
            "subject": "5c3f8bed091f3c3290ac1083",
            "year": 2016,
            "user": "5c2426542a7e2f361896f812",
            "profName": "Sami Ashour"
        },
        "createdAt": "2019-01-18T14:46:16.612Z",
        "updatedAt": "2019-01-18T14:46:16.612Z"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const corrections = await Correction.find()
      .populate({
        path: "document",
        select: "-deleted"
      })
      .populate({
        path: "user",
        select: "-deleted"
      })
      .exec();
    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/:id Get one correction
 * @apiGroup Corrections
 * @apiParam {id} id Correction id
 * @apiSuccess {Number} _id Correction id
 * @apiSuccess {Boolean} approved Whether the correction document is approved by the admin
 * @apiSuccess {Number} score Correction score
 * @apiSuccess {String} title Correction title
 * @apiSuccess {String} filePath Correction file path
 * @apiSuccess {Object} user Correction Owner
 * @apiSuccess {Object} document Correction document
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
    "approved": false,
    "score": 0,
    "_id": "5c41e6cdf6417937d0a24acf",
    "title": "correction ds 2018",
    "filePath": "/uploads/jdhgfhd.jpg",
    "user": {
        "type": "student",
        "_id": "5c2426542a7e2f361896f812",
        "email": "mohamed@test.com",
        "firstName": "mohamed",
        "lastName": "mohamed"
    },
    "document": {
        "type": "EX",
        "semestre": 1,
        "NBDowloads": 0,
        "session": "Principale",
        "corrections": [
            "5c41ccd20dbd0934ccc59a0e",
            "5c41cd34dfe31425c014f85e"
        ],
        "_id": "5c41df5e0000d416fc5158fd",
        "title": "EXAlgo",
        "filePath": "/uploads/hjkhdfkjl.pdf",
        "major": "5c3f8bee091f3c3290ac10b2",
        "subject": "5c3f8bed091f3c3290ac1083",
        "year": 2016,
        "user": "5c2426542a7e2f361896f812",
        "profName": "Sami Ashour"
    }
}
 * @apiErrorExample {json} Correction id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });
    const correction = await Correction.findById({
      _id: req.params.id
    })
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      // .populate({
      //   path: "document",
      //   select: "-approved"
      // })
      .exec();

    return res.json(correction);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {post} /corrections Create Correction
 * @apiGroup Corrections
 * @apiParam {String} title Correction title
 * @apiParam {String} filePath Correction document file url
 * @apiParam {String} user Correction owner (id)
 * @apiParam {String} document Correction document (id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "title": "correction ds analyse 2018",
 *      "filePath": "/uploads/jdhgfhd.jpg",
 *      "user": "5c2426542a7e2f361896f812",
 *      "document": "5c41df5e0000d416fc5158fd"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 Created
 * @apiErrorExample {json} Correction already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function create(req, res) {
  try {
    let correction = _.pick(req.body, "title", "filePath", "user", "document");
    await Correction.findOne(
      {
        document: correction.document,
        title: correction.title,
        user: correction.user
      },
      (err, result) => {
        if (err) {
          return res.status(500).end();
        } else if (result) {
          return res.status(208).end();
        }
      }
    );
    correction = await Correction.create(correction);
    return res.json(correction).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /corrections/:id Update Correction
 * @apiGroup Corrections
 * @apiParam {id} id Correction id
 * @apiParam {String} title Correction title
 * @apiParam {String} filePath Correction document file url
 * @apiParam {String} user Correction owner (id)
 * @apiParam {String} document Correction document (id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c41e6cdf6417937d0a24acf",
 *      "title": "correction ds analyse 2018",
 *      "filePath": "/uploads/jdhgfhd.jpg",
 *      "user": "5c2426542a7e2f361896f812",
 *      "document": "5c41df5e0000d416fc5158fd"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 Updated
 * @apiErrorExample {json} Correction id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function update(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });
    let correction = await Correction.findOne({
      _id: req.params.id
    });
    if (!correction)
      return res.status(400).json({
        error: "Correction not found !"
      });
    correction.title = req.body.title;
    correction.filePath = req.body.filePath;
    correction.user = req.body.user;
    correction.document = req.body.document;

    await correction.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.status(400).json({
        error: error.message
      });

    return res.status(500).end();
  }
}

/**
 * @api {delete} /corrections/:id Delete Correction
 * @apiGroup Corrections
 * @apiParam {id} id Correction id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Correction id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function remove(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });

    await Correction.remove({
      _id: req.params.id
    });

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.status(400).json({
        error: error.message
      });

    return res.status(500).end();
  }
}
