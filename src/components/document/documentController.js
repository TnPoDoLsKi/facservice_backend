import _ from "lodash";
import { Document, Subject } from "../../config/models";

/**
 * @api {get} /documents Get all documents
 * @apiGroup Documents
 * @apiSuccess {Number} _id Document id
 * @apiSuccess {Boolean} approved Whether the document is approved by the admin
 * @apiSuccess {String} type Document type (DS, Ex, ...)
 * @apiSuccess {Number} semestre Document semester (1 or 2)
 * @apiSuccess {String} title Document title
 * @apiSuccess {String} session Document session (Principale, Rattrapage)
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
        "approved": true,
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
    const documents = await Document.find().populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging")

    return res.json(documents);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /documents Get all documents
 * @apiGroup Documents
 * @apiSuccess {Number} _id Document id
 * @apiSuccess {Boolean} approved Whether the document is approved by the admin
 * @apiSuccess {String} type Document type (DS, Ex, ...)
 * @apiSuccess {Number} semestre Document semester (1 or 2)
 * @apiSuccess {String} title Document title
 * @apiSuccess {String} session Document session (Principale, Rattrapage)
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
        "approved": true,
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

export async function getAllByStatus(req, res) {
  try {

    if (!['pending', 'approved', 'rejected'].includes(req.params.status)) {
      return res.status(400).json({
        error: "status must be 'pending', 'approved' or 'rejected'"
      });
    }

    const documents = await Document.find({
      status: req.params.status
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging")

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
 * @apiSuccess {String} session Document session (Principale, Rattrapage)
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
    "approved": true,
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
 * @apiErrorExample {json} Document id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getOne(req, res) {
  try {

    const document = await Document.findById({
      _id: req.params.id,
      status: 'approved'
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging")

    return res.json(document);

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {get} /documents/subject/:id Get documents by type 
 * @apiGroup Documents
 * @apiParam {id} id Subject id
 * @apiParam {String} type Document type (DS, EX, C, TP, TD)
 * @apiParamExample {json} Input
 *    {
 *      "type": "ex"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "type": "EX",
        "semestre": 1,
        "approved": true,
        "NBDowloads": 0,
        "verifiedByProf": false,
        "session": "Principale",
        "corrections": [],
        "_id": "5c63689000aa6a06a4dfd577",
        "title": "EX Algo 2017",
        "filePath": "/uploads/jdhgfhd.jpg",
        "user": "5c63688f00aa6a06a4dfd573",
        "major": "5c63688f00aa6a06a4dfd571",
        "subject": "5c63688e00aa6a06a4dfd540",
        "year": 2017,
        "profName": "profX",
        "createdAt": "2019-02-13T00:45:04.446Z",
        "updatedAt": "2019-02-13T00:45:04.446Z"
    }
]
 * @apiErrorExample {json} Subject id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getDocBySubjectByType(req, res) {
  try {

    if (!['DS', 'EX', 'C', 'TD', 'TP'].includes(req.params.type))
      return res.status(400).json({ error: 'wrong document type' })

    const subjectObject = await Subject.findOne({ _id: req.params.subjectId })

    if (!subjectObject)
      return res.status(400).json({ error: 'wrong subject id' })

    const documents = await Document.find({
      subject: req.params.subjectId,
      type: req.params.type,
      status: 'approved'
    }).populate({
      path: "user",
      select: "firstName lastName avatar -_id"
    }).select("-filesStaging")

    return res.json(documents);

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

export async function getDocByUser(req, res) {
  try {

    const documents = await Document.find({
      user: req.user._id
    })

    return res.status(200).json(documents)

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

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
 *      "session": "Rattrapage",
 *      "corrections": ["5c41ccd20dbd0934ccc59a0e","5c41cd34dfe31425c014f85e"]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "type": "DS",
    "semestre": 1,
    "approved": false,
    "session": "Rattrapage",
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
      "type",
      "subject",
      "year",
      "session",
      "description",
      "filesStaging",
      "corrections"
    )

    if (!(document.type && document.subject && document.year && document.filesStaging))
      return res.status(400).json({ error: 'missing body params' })

    if (!['DS', 'EX', 'C', 'TD', 'TP'].includes(document.type))
      return res.status(400).json({ error: 'wrong document type' })

    if (isNaN(document.year))
      return res.status(400).json({ error: 'year must be a number' })

    const subjectObject = await Subject.findOne({ _id: document.subject })

    if (!subjectObject)
      return res.status(400).json({ error: 'wrong subject id' })

    if (req.body.session && !['Principale', 'Rattrapage'].includes(req.body.session))
      return res.status(400).json({ error: 'wrong document session' })

    document.status = 'pending'
    document.user = req.user._id
    document.title = document.type + ' ' + subjectObject.name + ' ' + document.year

    document = await Document.create(document);
    return res.json(document);

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {put} /documents/:id Update a document
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
 *      "session": "Rattrapage",
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

    let docStatusChanged = false
    let currentDocument = await Document.findOne({ _id: req.params.id })

    if (req.body.title)
      currentDocument.title = req.body.title

    if (req.body.description)
      currentDocument.description = req.body.description

    if (req.body.year) {
      if (isNaN(req.body.year))
        return res.status(400).json({ error: 'year must be a number' })

      currentDocument.year = req.body.year
    }

    if (req.body.type) {
      if (!['DS', 'EX', 'C', 'TD', 'TP'].includes(req.body.type))
        return res.status(400).json({ error: 'wrong document type' })

      currentDocument.type = req.body.type
    }

    if (req.body.session) {
      if (!['Principale', 'Rattrapage'].includes(req.body.session))
        return res.status(400).json({ error: 'wrong document session' })

      currentDocument.session = req.body.session
    }

    if (req.body.status) {
      if (!['pending', 'approved', 'rejected'].includes(req.body.status))
        return res.status(400).json({ error: 'wrong document status' })

      if (!(!['pending', 'rejected'].includes(req.body.status) && !['pending', 'rejected'].includes(currentDocument.status)) &&
        (req.body.status != currentDocument.status))

        docStatusChanged = true

      currentDocument.status = req.body.status
    }

    if (req.body.subject) {
      const subject = await Subject.findOne({ _id: req.body.subject })

      if (!subject)
        return res.status(400).json({ error: 'wrong subject id' })

      currentDocument.subject = req.body.subject
    }

    await currentDocument.save()

    if (docStatusChanged) {
      let subject = await Subject.findOne({ _id: currentDocument.subject })

      if (req.body.status == 'approved') {

        switch (currentDocument.type) {
          case 'DS':
            subject.documentsCount.DS++
            break;

          case 'EX':
            subject.documentsCount.EX++
            break;

          case 'C':
            subject.documentsCount.C++
            break;

          case 'TD':
            subject.documentsCount.TD++
            break;

          case 'TP':
            subject.documentsCount.TP++
            break;

          default:
            break;
        }
      } else {

        switch (currentDocument.type) {
          case 'DS':
            subject.documentsCount.DS--
            break;

          case 'EX':
            subject.documentsCount.EX--
            break;

          case 'C':
            subject.documentsCount.C--
            break;

          case 'TD':
            subject.documentsCount.TD--
            break;

          case 'TP':
            subject.documentsCount.TP--
            break;

          default:
            break;
        }

      }

      await subject.save()
    }

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
 * @api {delete} /documents/:id Delete a document
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

    const currentDocument = await Document.findOne({ _id: req.params.id })

    await Document.delete({ _id: req.params.id }, req.user._id);

    let subject = await Subject.findOne({ _id: currentDocument.subject })
    
    switch (currentDocument.type) {
      case 'DS':
        subject.documentsCount.DS--
        break;

      case 'EX':
        subject.documentsCount.EX--
        break;

      case 'C':
        subject.documentsCount.C--
        break;

      case 'TD':
        subject.documentsCount.TD--
        break;

      case 'TP':
        subject.documentsCount.TP--
        break;

      default:
        break;
    }

    await subject.save()

    return res.status(204).end();

  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.status(400).json({ error: error.message });

    return res.status(500).end();
  }
}

