import Document from "../document/document";
import Fuse from "fuse.js";

/**
 * @api {post} /search Search all documents
 * @apiGroup Search
 * @apiParam {String} name Search query
 * @apiParamExample {json} Input
 *    {
 *      "name": "algo"
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
    if (!req.query.name) {
      return res.status(400).end();
    } else {
      const options = {
        shouldSort: true,
        includeScore: true,
        threshold: 0.27,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: ["title", "major", "year", "type"]
      };
      const documents = await Document.find();
      const fuse = new Fuse(documents, options);
      const result = fuse.search(req.query.name);
      let docs = result.map(resl => {
        return resl.item;
      });

      return res.status(200).json(docs);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
