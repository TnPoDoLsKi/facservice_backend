import _ from "lodash";
import { Correction, Document } from "../../config/models";
import PdfPrinter from "pdfmake";
import { HOST } from '../../config/env'

export async function getAll(req, res) {
  try {
    const corrections = await Correction.find()
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .select("-filesStaging");

    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {
    const correction = await Correction.findById({
      _id: req.params.id
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .select("-filesStaging");

    return res.json(correction);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({
        error: error.message
      });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/byDocument/:id Get document's corrections
 * @apiGroup Corrections
 * @apiParam {id} id Document id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAllByDocument(req, res) {
  try {
    const corrections = await Correction.find({
      document: req.params.documentId,
      status: "approved"
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .select("-filesStaging");

    return res.json(corrections);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({
        error: error.message
      });
    console.log(error);

    return res.status(500).end();
  }
}

export async function getAllByStatus(req, res) {
  try {
    if (!["pending", "approved", "rejected"].includes(req.params.status)) {
      return res.status(400).json({
        error: "status must be 'pending', 'approved' or 'rejected'"
      });
    }

    const corrections = await Correction.find({
      status: req.params.status
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .populate({
        path: "document",
        populate: {
          path: "subject",
          select: "name",
          populate: { path: "majors", select: "_id name" }
        }
      });
    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {post} /corrections Create a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "filesStaging": ["https://igc.tn/img/portfolio/HC1-Prev.jpg", "https://igc.tn/img/portfolio/A2-Prev.jpg"],
 *      "document": "5c41b2d82383c111b4ffad1a",
 *      "description": "Correction Correction Correction Correction"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "_id": "5c88f1c4719c206b4524de83",
        "deleted": false,
        "document": "5c41b2d82383c111b4ffad1a",
        "title": "corrigé de EX physique 2015",
        "user": "5c8783b34a35cd28fa5bea3b",
        "createdAt": "2019-03-13T12:04:20.911Z",
        "updatedAt": "2019-03-13T12:04:20.911Z",
        "__v": 0
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    status must be 'pending', 'approved' or 'rejected'
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function create(req, res) {
  try {
    let correction = _.pick(req.body, "filesStaging", "document", "description");

    if (!(correction.filesStaging && correction.document))
      return res.status(400).json({
        error: "missing body params"
      });

    let document = await Document.findOne({
      _id: correction.document
    });
    if (!document)
      return res.status(400).json({
        error: "wrong document id"
      });

    correction.title = "Corrigé de " + document.title;
    correction.status = "pending";
    correction.user = req.user._id;

    correction = await Correction.create(correction);

    correction = correction.toJSON();
    delete correction.filesStaging;

    return res.json(correction);
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({
        error: error.message
      });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {put} /corrections/:id Update a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiParamExample {json} Input
 *    {
 *      "filesStaging": ["https://igc.tn/img/portfolio/HC1-Prev.jpg", "https://igc.tn/img/portfolio/A2-Prev.jpg"],
 *      "document": "5c41b2d82383c111b4ffad1a",
 *      "description": "Correction Correction Correction Correction"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "_id": "5c88f1c4719c206b4524de83",
        "deleted": false,
        "document": "5c41b2d82383c111b4ffad1a",
        "title": "corrigé de EX physique 2015",
        "user": "5c8783b34a35cd28fa5bea3b",
        "createdAt": "2019-03-13T12:04:20.911Z",
        "updatedAt": "2019-03-13T12:04:20.911Z",
        "__v": 0
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    wrong document id
 *    wrong correction status
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function update(req, res) {
  try {
    let correction = await Correction.findOne({
      _id: req.params.id
    });

    if (!correction)
      return res.status(400).json({
        error: "Correction not found !"
      });

    if (req.body.title) correction.title = req.body.title;

    if (req.body.document) {
      let document = await Document.findOne({
        _id: req.body.document
      });
      if (!document)
        return res.status(400).json({
          error: "wrong document id"
        });

      correction.document = req.body.document;
    }

    if (req.body.status) {
      let document = await Document.findOne({
        _id: correction.document
      });

      if (!["pending", "approved", "rejected"].includes(req.body.status))
        return res.status(400).json({
          error: "wrong correction status"
        });

      if (!document.hasCorrection && req.body.status == "approved") {
        document.hasCorrection = true;
        await document.save();
      }

      if (correction.status != "approved" && req.body.status == "approved") {
        correction.filePath = createPDF(correction.filesStaging, correction.title);
      }

      if (["pending", "rejected"].includes(req.body.status)) {
        const corrections = await Correction.find({
          document: correction.document,
          status: "approved"
        });
        if (corrections.length == 1) {
          document.hasCorrection = false;
          await document.save();
        }
      }

      correction.status = req.body.status;
    }

    await correction.save();

    return res.json(correction)
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
 * @api {delete} /corrections/:id Delete a correction
 * @apiGroup Corrections
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    CastError
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function remove(req, res) {
  try {
    const correction = await Correction.findOne({
      _id: req.params.id
    });

    await Correction.delete({
      _id: req.params.id
    });

    const corrections = await Correction.find({
      document: correction.document,
      status: "approved"
    });

    if (corrections.length == 0)
      await Document.update(
        {
          _id: correction.document
        },
        {
          $set: {
            hasCorrection: false
          }
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

export async function getByUser(req, res) {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Empty user ID" });
    }
    const corrections = await Correction.find({
      user: req.params.userId
    });

    return res.status(200).json(corrections);
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.status(400).json({ error: error.message });

    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/approved/bySubject/:subjectId Get approved corrections by subject id
 * @apiGroup Corrections
 * @apiParam {id} id Subejct id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "approved",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAllApprovedBySubject(req, res) {
  try {

    const corrections = await Correction.find({
      status: "approved"
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .populate({
        path: "document",
        populate: {
          path: "subject",
          select: "_id name"
        }
      });

    let result = []

    for (let correction of corrections) {

      if (!correction.document)
        continue;

      console.log(correction.document.subject._id)
      console.log(req.params.subjectId)

      if (correction.document.subject._id == req.params.subjectId) {
        correction = correction.toJSON();
        delete correction.document
        result.push(correction)
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/pending/bySubject/:subjectId Get pending corrections by subject id
 * @apiGroup Corrections
 * @apiParam {id} id Subejct id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAllPendingBySubject(req, res) {
  try {

    const corrections = await Correction.find({
      status: "pending"
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })
      .populate({
        path: "document",
        populate: {
          path: "subject",
          select: "_id name"
        }
      });

    let result = []

    for (let correction of corrections) {

      if (!correction.document)
        continue;

      console.log(correction.document.subject._id)
      console.log(req.params.subjectId)

      if (correction.document.subject._id == req.params.subjectId) {
        correction = correction.toJSON();
        delete correction.document
        result.push(correction)
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {get} /corrections/pending/byDocument/:documentId Get pending corrections by document id
 * @apiGroup Corrections
 * @apiParam {id} id Document id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c8826a5f9a4c66ce1eb1d5d",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de DS Physique 2014",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:37:41.572Z",
        "updatedAt": "2019-03-12T22:40:30.601Z",
        "__v": 0
    },
    {
        "status": "pending",
        "verifiedByProf": false,
        "score": 0,
        "deleted": false,
        "_id": "5c88270ef9a4c66ce1eb1d5e",
        "document": "5c87918f905e0b33f609b360",
        "title": "corrigé de EX Analyse 2014 ",
        "user": {
            "avatar": "https://igc.tn/img/portfolio/HC1-Prev.jpg",
            "firstName": "Wael",
            "lastName": "Ben Taleb"
        },
        "createdAt": "2019-03-12T21:39:26.070Z",
        "updatedAt": "2019-03-12T22:26:16.867Z",
        "__v": 0
    }
]
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAllPendingByDocument(req, res) {
  try {

    const corrections = await Correction.find({
      status: "pending"
    })
      .populate({
        path: "user",
        select: "firstName lastName avatar -_id"
      })

    let result = []

    for (let correction of corrections) {

      if (!correction.document)
        continue;

      if (correction.document._id == req.params.documentId) {
        correction = correction.toJSON();
        delete correction.document
        result.push(correction)
      }
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

function createPDF(files, title) {

  let existingPDF

  for (let file of files) {
    let parts = file.split('.')
    if (parts[parts.length - 1] == 'pdf')
      existingPDF = file
  }

  if (existingPDF)
    return existingPDF

  let content = files.map(item => {
    return {
      image: "public" + item.replace(HOST, ""),
      width: 595,
      height: 842
    }
  })

  let printer = new PdfPrinter();

  let docDefinition = {
    content: content,
    info: {
      title,
      author: "Issat Sousse Google Club"
    },
    pageMargins: [0, 0, 0, 0]
  };

  let pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(
    fs.createWriteStream(
      "public/pdfs/" + title + ".pdf"
    ),
    {
      encoding: "utf16"
    }
  );

  pdfDoc.end();

  let filePath = "https://api.facservice.tn/pdfs/" + title + ".pdf"

  return filePath
}
