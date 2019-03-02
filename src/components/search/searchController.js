import Document from "../document/document";
import Fuse from "fuse.js";

/**
 * @api {get} /search Search all documents
 * @apiGroup Search
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
        "semestre": 1,
        "approved": false,
        "session": "Principale",
        "corrections": [],
        "_id": "5c41ae2c6c942e059c10737d",
        "title": "dsAlgo",
        "filePath": "/uploads/hjkhdfkjl.pdf",
        "major": "5c3f8bee091f3c3290ac10b2",
        "subject": "5c41b2d82383c111b4ffad1d",
        "year": 2016,
        "user": "5c2426542a7e2f361896f812",
        "createdAt": "2019-01-18T10:45:00.529Z",
        "updatedAt": "2019-01-18T10:45:00.529Z"
    },
    {
        "type": "EX",
        "semestre": 1,
        "approved": false,
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
        "profName": "Sami Ashour",
        "createdAt": "2019-01-18T14:14:54.344Z",
        "updatedAt": "2019-01-18T14:14:54.344Z"
    }]
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function search(req, res) {
  try {
    let documents = {};
    if (!req.query.name) {
      return res.status(400).end();
    } else if (req.query.majorID) {
      documents = await Document.find({
        major: req.query.majorID,
        approved: true
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
    } else if (req.query.type) {
      documents = await Document.find({ type: req.query.type, approved: true })
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
    } else {
      documents = await Document.find({ approved: true })
        .populate({
          path: "user",
          select: "-major -avatar -hashedPassword -deleted -__v"
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
    }
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

    return res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
