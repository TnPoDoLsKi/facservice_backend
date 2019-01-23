import _ from "lodash";
import { Document, Correction } from "../../config/models";
// import { upload } from "../../services/uploadService";

export async function getAll(req, res) {
  try {
    const documents = await Document.find()
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      .populate({
        path: "major",
        select: "-subjects -formation -level -section"
      })
      .populate({
        path: "subject",
        select: "-deleted"
      })
      .populate({
        path: "corrections",
        select: "-deleted"
      })
      .exec();

    return res.json(documents);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Document id cannot be empty!"
      });

    const document = await Document.findById({
      _id: req.params.id
    })
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      .populate({
        path: "major",
        select: "-subjects -formation -level -section"
      })
      .populate({
        path: "subject",
        select: "-deleted"
      })
      .populate({
        path: "corrections",
        select: "-deleted"
      })
      .exec();

    return res.json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /documents/:id/corrections Get all corrections for a specific document
 * @apiGroup Documents
 * @apiName getDocCorrections
 * @apiParam {id} id Document id
 * @apiSuccess {Number} _id Correction id
 * @apiSuccess {Boolean} approved Whether the correction document is approved by the admin
 * @apiSuccess {Number} score Correction score
 * @apiSuccess {String} title Correction title
 * @apiSuccess {String} filePath Correction file path
 * @apiSuccess {Object} user Correction Owner
 * @apiSuccess {String} document Correction document
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
            "major": "5c1fb346e28363333004f02c"
        },
        "document": "5c41df5e0000d416fc5158fd",
        "createdAt": "2019-01-18T14:46:16.612Z",
        "updatedAt": "2019-01-18T14:46:16.612Z"
    },
    {
        "approved": false,
        "score": 0,
        "_id": "5c41e6cdf6417937d0a24acf",
        "title": "correction ds 2018",
        "filePath": "/uploads/jdhgfhd.jpg",
        "user": {
            "type": "student",
            "_id": "5c2426542a7e2f361896f812",
            "email": "mohamed@test.com",
            "hashedPassword": "$2b$10$7iOFilgwRN/qoXNA5KJuVuyiofVXvjmVEcn0MVivS4F7ne.vI9MWq",
            "firstName": "mohamed",
            "lastName": "mohamed",
            "major": "5c1fb346e28363333004f02c"
        },
        "document": "5c41df5e0000d416fc5158fd",
        "createdAt": "2019-01-18T14:46:37.828Z",
        "updatedAt": "2019-01-18T14:46:37.828Z"
    }
]
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getDocCorrections(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Document id cannot be empty!"
      });
    const corrections = await Correction.find({
      document: req.params.id
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

export async function create(req, res) {
  try {
    let document = _.pick(
      req.body,
      "title",
      "description",
      "filePath",
      "type",
      "semestre",
      "major",
      "subject",
      "year",
      "user",
      "session",
      "profName"
    );
    // document.filePath = upload(req, res);
    await Document.findOne(
      {
        type: document.type,
        description: document.description,
        semestre: document.semestre,
        major: document.major,
        subject: document.subject,
        year: document.year,
        session: document.session,
        profName: document.profName,
        title: document.title,
        filePath: document.filePath
      },
      (err, document) => {
        if (err) {
          return res.status(500).end();
        } else if (document) {
          return res.status(208).end();
        }
      }
    );
    document.corrections = [];
    for (let i = 0; i < req.body.corrections.length; ++i) {
      document.corrections.push(req.body.corrections[i]);
    }
    document = await Document.create(document);
    return res.json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Document id cannot be empty!"
      });

    const document = _.pick(
      req.body,
      "title",
      "description",
      "filePath",
      "type",
      "semestre",
      "major",
      "subject",
      "year",
      "user",
      "session",
      "profName "
    );
    await Document.findOne(
      {
        type: document.type,
        description: document.description,
        semestre: document.semestre,
        major: document.major,
        subject: document.subject,
        year: document.year,
        session: document.session,
        profName: document.profName,
        title: document.title,
        filePath: document.filePath
      },
      (err, document) => {
        if (err) {
          return res.status(500).end();
        } else if (document) {
          return res.status(208).end();
        }
      }
    );
    await Document.update(
      {
        _id: req.params.id
      },
      {
        $set: document
      }
    );

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

export async function remove(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "Document id cannot be empty!"
      });

    await Document.remove({
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
