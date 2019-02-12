import _ from "lodash";
import { Document } from "../../config/models";
// import { upload } from "../../services/uploadService";

/**
 * @api {get} /documents Get all documents
 * @apiGroup Documents
 * @apiSuccess {Number} _id Document id
 * @apiSuccess {Boolean} approved Whether the document is approved by the admin
 * @apiSuccess {String} type Document type (DS, Ex, ...)
 * @apiSuccess {Number} semestre Document semester (1 or 2)
 * @apiSuccess {String} title Document title
 * @apiSuccess {String} session Document session (Principale, Controle)
 * @apiSuccess {String} filePath Document file path
 * @apiSuccess {Object} user Document Owner
 * @apiSuccess {Object} corrections Document corrections (a table of objects)
 * @apiSuccess {Object} major Document major
 * @apiSuccess {Object} subject Document subject
 * @apiSuccess {Number} year Document year
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
     {
        "type": "DS",
        "semestre": 1,
        "approved": false,
        "session": "Principale",
        "corrections": [],
        "_id": "5c41ae2c6c942e059c10737d",
        "title": "dsAlgo",
        "filePath": "/uploads/hjkhdfkjl.pdf",
        "major": {
            "_id": "5c3f8bee091f3c3290ac10b2",
            "name": "FIA1",
            "description": "1ere année Formation d'Ingénieur"
        },
        "subject": {
            "semestre": 1,
            "documents": [],
            "_id": "5c41b2d82383c111b4ffad1d",
            "name": "Algorithmique et structures de données",
            "createdAt": "2019-01-18T11:04:56.121Z",
            "updatedAt": "2019-01-18T11:04:56.121Z",
            "__v": 0
        },
        "year": 2016,
        "user": {
            "type": "student",
            "deleted": false,
            "_id": "5c2426542a7e2f361896f812",
            "email": "mohamed@test.com",
            "firstName": "mohamed",
            "lastName": "mohamed",
            "__v": 0
        },
        "createdAt": "2019-01-18T10:45:00.529Z",
        "updatedAt": "2019-01-18T10:45:00.529Z"
    }]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const documents = await Document.find()
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      // .populate({
      //   path: "major",
      //   select: "-subjects -formation -level -section"
      // })
      // .populate({
      //   path: "subject",
      //   select: "-deleted"
      // })
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

/**
 * @api {get} /documents/:id Get one document
 * @apiGroup Documents
 * @apiParam {id} id Document id
 * @apiSuccess {Number} _id Document id
 * @apiSuccess {Boolean} approved Whether the document is approved by the admin
 * @apiSuccess {String} type Document type (DS, Ex, ...)
 * @apiSuccess {Number} semestre Document semester (1 or 2)
 * @apiSuccess {String} title Document title
 * @apiSuccess {String} session Document session (Principale, Controle)
 * @apiSuccess {String} filePath Document file path
 * @apiSuccess {Object} user Document Owner
 * @apiSuccess {Object} corrections Document corrections (a table of objects)
 * @apiSuccess {Object} major Document major
 * @apiSuccess {Object} subject Document subject
 * @apiSuccess {Number} year Document year
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "type": "DS",
    "semestre": 1,
    "approved": false,
    "session": "Principale",
    "corrections": [],
    "_id": "5c41ae2c6c942e059c10737d",
    "title": "dsAlgo",
    "filePath": "/uploads/hjkhdfkjl.pdf",
    "major": {
        "_id": "5c3f8bee091f3c3290ac10b2",
        "name": "FIA1",
        "description": "1ere année Formation d'Ingénieur"
    },
    "subject": {
        "semestre": 1,
        "documents": [],
        "_id": "5c41b2d82383c111b4ffad1d",
        "name": "Algorithmique et structures de données",
        "createdAt": "2019-01-18T11:04:56.121Z",
        "updatedAt": "2019-01-18T11:04:56.121Z"
    },
    "year": 2016,
    "user": {
        "type": "student",
        "deleted": false,
        "_id": "5c2426542a7e2f361896f812",
        "email": "mohamed@test.com",
        "firstName": "mohamed",
        "lastName": "mohamed"
    },
    "createdAt": "2019-01-18T10:45:00.529Z",
    "updatedAt": "2019-01-18T10:45:00.529Z"
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
        error: "Document id cannot be empty!"
      });

    const document = await Document.findById({
      _id: req.params.id
    })
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      // .populate({
      //   path: "major",
      //   select: "-subjects -formation -level -section"
      // })
      // .populate({
      //   path: "subject",
      //   select: "-deleted"
      // })
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
 * @api {post} /documents Create a document
 * @apiGroup Documents
 * @apiParam {String} title Document title
 * @apiParam {String} filePath Document document file url
 * @apiParam {String} user Document owner (id)
 * @apiParam {String} year Document year
 * @apiParam {String} type Document type
 * @apiParam {String} semestre Document semestre
 * @apiParam {String} major Document major (id)
 * @apiParam {String} subject Document subject (id)
 * @apiParam {String} session Document session
 * @apiParam {String} profName Document professor
 * @apiParam {Array} corrections Document corrections
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "title": "ds analyse 2018",
 *      "type": "DS",
 *      "filePath": "/uploads/jdhgfhd.jpg",
 *      "user": "5c2426542a7e2f361896f812",
 *      "major": "5c41df5e0000d416fc5158fd",
 *      "subject": "5c41b2d82383c111b4ffad1a",
 *      "year": "2017",
 *      "semestre": "1",
 *      "profName": "profX",
 *      "session": "Controle",
 *      "corrections": ["5c41ccd20dbd0934ccc59a0e","5c41cd34dfe31425c014f85e"]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "type": "DS",
    "semestre": 1,
    "approved": false,
    "session": "Controle",
    "corrections": [],
    "_id": "5c4f8ce1fcf8b220f82633dd",
    "title": "ds analyse 2018",
    "filePath": "/uploads/jdhgfhd.jpg",
    "major": "5c41df5e0000d416fc5158fd",
    "subject": "5c41b2d82383c111b4ffad1a",
    "year": 2017,
    "user": "5c2426542a7e2f361896f812",
    "profName": "profX",
    "corrections" : [ 
        ObjectId("5c41ccd20dbd0934ccc59a0e"), 
        ObjectId("5c41cd34dfe31425c014f85e")
    ],
    "createdAt": "2019-01-28T23:14:41.584Z",
    "updatedAt": "2019-01-28T23:14:41.584Z"
}
 * @apiErrorExample {json} Document already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function create(req, res) {
  try {
    let document = _.pick(
      req.body,
      "title",
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
    await Document.findOne(
      {
        type: document.type,
        semestre: document.semestre,
        major: document.major,
        subject: document.subject,
        year: document.year,
        session: document.session,
        profName: document.profName,
        title: document.title,
        filePath: document.filePath,
        user: document.user
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
    if (req.body.corrections) {
      for (let i = 0; i < req.body.corrections.length; ++i) {
        document.corrections.push(req.body.corrections[i]);
      }
    }
    document = await Document.create(document);
    return res.json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {put} /documents Update a document
 * @apiGroup Documents
 * @apiParam {id} id documents id
 * @apiParam {String} title Document title
 * @apiParam {String} filePath Document document file url
 * @apiParam {String} user Document owner (id)
 * @apiParam {String} year Document year
 * @apiParam {String} type Document type
 * @apiParam {String} semestre Document semestre
 * @apiParam {String} major Document major (id)
 * @apiParam {String} subject Document subject (id)
 * @apiParam {String} session Document session
 * @apiParam {String} profName Document professor
 * @apiParam {Array} corrections Document corrections
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
{
        "id": "5c4f8da2fcf8b220f82633de",
 *      "title": "ds analyse 2018",
 *      "type": "DS",
 *      "filePath": "/uploads/jdhgfhd.jpg",
 *      "user": "5c2426542a7e2f361896f812",
 *      "major": "5c41df5e0000d416fc5158fd",
 *      "subject": "5c41b2d82383c111b4ffad1a",
 *      "year": "2017",
 *      "semestre": "1",
 *      "profName": "profX",
 *      "session": "Controle",
 *      "corrections": ["5c41ccd20dbd0934ccc59a0e","5c41cd34dfe31425c014f85e"]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Updated
 * @apiErrorExample {json} Document id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

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
      "profName",
      "corrections"
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

/**
 * @api {delete} /documents Delete a document
 * @apiGroup Documents
 * @apiParam {id} id documents id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} Document id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

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
