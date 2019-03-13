import _ from "lodash";
import Fuse from "fuse.js";
import { Document, Subject, Major } from "../../config/models";

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
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
{
    "type": "DS",
    "status": "approved",
    "NBDowloads": 215,
    "session": "Rattrapage",
    "hasCorrection": true,
    "deleted": false,
    "_id": "5c87918f905e0b33f609b360",
    "filePath": "https://igc.tn/documents/file.pdf",
    "subject": "5c8269c447baab426f6cbcfc",
    "year": 2014,
    "user": {
        "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
        "firstName": "Wael",
        "lastName": "Ben Taleb"
    },
    "title": "DS Francais 2014",
    "createdAt": "2019-03-12T11:01:35.921Z",
    "updatedAt": "2019-03-12T22:56:21.614Z",
    "__v": 0,
    "description": "DS Francais 2014 description"
}
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
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
 * @api {get} /documents/bySubject/:subjectId/byType/:type Get documents by subject and type 
 * @apiGroup Documents
 * @apiParam {id} subjectId Subject id
 * @apiParam {String} type Document type (DS, EX, C, TP, TD)
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
      "type": "DS",
      "status": "approved",
      "NBDowloads": 215,
      "session": "Rattrapage",
      "hasCorrection": true,
      "deleted": false,
      "_id": "5c87918f905e0b33f609b360",
      "filePath": "https://igc.tn/documents/file.pdf",
      "subject": "5c8269c447baab426f6cbcfc",
      "year": 2014,
      "user": {
          "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
          "firstName": "Wael",
          "lastName": "Ben Taleb"
      },
      "title": "DS Francais 2014",
      "createdAt": "2019-03-12T11:01:35.921Z",
      "updatedAt": "2019-03-12T22:56:21.614Z",
      "__v": 0,
      "description": "DS Francais 2014 description"
    },
    {
      "type": "DS",
      "status": "approved",
      "NBDowloads": 215,
      "session": "Rattrapage",
      "hasCorrection": true,
      "deleted": false,
      "_id": "5c87918f905e0b33f609b361",
      "filePath": "https://igc.tn/documents/file.pdf",
      "subject": "5c8269c447baab426f6cbcfc",
      "year": 2014,
      "user": {
          "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
          "firstName": "Wael",
          "lastName": "Ben Taleb"
      },
      "title": "DS Anglais 2014",
      "createdAt": "2019-03-12T11:01:35.921Z",
      "updatedAt": "2019-03-12T22:56:21.614Z",
      "__v": 0,
      "description": "DS Anglais 2014 description"
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
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
 * @api {get} /documents/search/:query Search all documents
 * @apiGroup Documents
 * @apiParam {String} name S
 * @apiParam {String} type document type (optional)
 * @apiParam {ID} majorID major id (optional)
 *
 * @apiParamExample {json} Input
 *    {
 *      "name": "algo"
 *    }
 * @apiParamExample {json} Input
 *    {
 *       "name": "algo",
 *       "majorID": "5c41ae2c6c942e059c10737d"
 *    }
 * @apiParamExample {json} Input
 *    {
 *       "name": "algo",
 *       "type": "ds"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
  * [
    {
      "type": "DS",
      "status": "approved",
      "NBDowloads": 215,
      "session": "Rattrapage",
      "hasCorrection": true,
      "deleted": false,
      "_id": "5c87918f905e0b33f609b360",
      "filePath": "https://igc.tn/documents/file.pdf",
      "subject": "5c8269c447baab426f6cbcfc",
      "year": 2014,
      "user": {
          "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
          "firstName": "Wael",
          "lastName": "Ben Taleb"
      },
      "major": {
          "_id": "5c8269c447baab426f6cbcfa",
          "name": "LFSI 2"
      },
      "title": "DS Francais 2014",
      "createdAt": "2019-03-12T11:01:35.921Z",
      "updatedAt": "2019-03-12T22:56:21.614Z",
      "__v": 0,
      "description": "DS Francais 2014 description"
    },
    {
      "type": "DS",
      "status": "approved",
      "NBDowloads": 215,
      "session": "Rattrapage",
      "hasCorrection": true,
      "deleted": false,
      "_id": "5c87918f905e0b33f609b361",
      "filePath": "https://igc.tn/documents/file.pdf",
      "subject": "5c8269c447baab426f6cbcfc",
      "year": 2014,
      "user": {
          "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
          "firstName": "Wael",
          "lastName": "Ben Taleb"
      },
      "major": {
        "_id": "5c8269c447baab426f6cbcfa",
        "name": "Ing 1"
      },
      "title": "DS Anglais 2014",
      "createdAt": "2019-03-12T11:01:35.921Z",
      "updatedAt": "2019-03-12T22:56:21.614Z",
      "__v": 0,
      "description": "DS Anglais 2014 description"
    }
]
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function search(req, res) {
  try {

    if (!req.query.name)
      return res.status(400).end();

    let queryOptions = {
      status: 'approved'
    }

    if (req.query.type)
      queryOptions.type = req.query.type

    if (req.query.majorID) {
      let subjects = await Subject.find({ majors: { $in: req.query.majorID } }).select("_id")
      subjects = subjects.map(item => item._id)
      console.log(subjects)
      queryOptions.subject = { $in: subjects }
    }

    let documents = await Document.find(queryOptions)
      .populate({
        path: "user",
        select: "-major -avatar -hashedPassword"
      })
      .populate({
        path: "major",
        select: "_id name"
      })

    const options = {
      shouldSort: true,
      includeScore: true,
      threshold: 0.21,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ["type", "title", "session", "year"]
    };

    const fuse = new Fuse(documents, options);
    const result = fuse.search(req.query.name);

    let docs = result.map(resl => {
      return resl.item;
    });

    return res.json(docs);

  } catch (err) {
    console.log(err);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {post} /documents Create a document
 * @apiGroup Documents
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "type": "DS",
 *      "filesStaging": ["https://igc.tn/img/portfolio/HC1-Prev.jpg", "https://igc.tn/img/portfolio/A2-Prev.jpg"],
 *      "subject": "5c41b2d82383c111b4ffad1a",
 *      "year": "2017",
 *      "description": "Good",
 *      "session": "Rattrapage"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
    "type": "DS",
    "status": "pending",
    "NBDowloads": 0,
    "session": "Rattrapage",
    "hasCorrection": false,
    "_id": "5c88f050737cb969e1f1cbda",
    "deleted": false,
    "subject": "5c41b2d82383c111b4ffad1a",
    "year": 2017,
    "user": "5c8783b34a35cd28fa5bea3b",
    "title": "DS physique 2015",
    "description": "Good",
    "createdAt": "2019-03-13T11:58:08.713Z",
    "updatedAt": "2019-03-13T11:58:08.713Z",
    "__v": 0
}
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
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
      "filesStaging"
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

    document = document.toJSON()
    delete document.filesStaging

    return res.json(document);

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

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

