import _ from "lodash";
import { Correction } from "../../config/models";

export async function getAll(req, res) {
  try {
    const corrections = await Correction.find();
    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getDocCorrections(req, res) {
  try {
    if (!req.params.docID)
      return res.status(400).json({
        error: "Document id cannot be empty!"
      });
    const corrections = await Correction.find({
      document: req.params.docID
    });
    return res.json(corrections);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {
    if (!req.params.corrID)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });
    const correction = await Correction.find({
      _id: req.params.corrID
    })
      .populate("document")
      .populate("user")
      .exec();

    return res.json(correction);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

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

export async function update(req, res) {
  try {
    if (!req.params.corrID)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });

    const correction = _.pick(
      req.body,
      "title",
      "filePath",
      "user",
      "document"
    );
    await Correction.findOne(
      {
        title: correction.title,
        filePath: correction.filePath,
        document: correction.document,
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
    await Correction.update(
      {
        _id: req.params.corrID
      },
      {
        $set: correction
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
    if (!req.params.corrID)
      return res.status(400).json({
        error: "Correction id cannot be empty!"
      });

    await Correction.remove({
      _id: req.params.corrID
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
