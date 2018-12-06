import _ from "lodash";
import Document from "./document";

export async function getAll(req, res) {
  try {
    let Documents = await Document.find();

    return res.json(Documents);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        code: 126,
        error: "id cannot be empty"
      });

    let document = await Document.findById({
      _id: req.params.id
    });

    return res.json({
      document
    });
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
      "type",
      "semestre",
      "major",
      "subject"
    );

    document = await Document.create(document);
    console.log("mriguel");
    return res.json({
      document
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        code: 126,
        error: "id cannot be empty"
      });

    let document = _.pick(
      req.body,
      "title",
      "type",
      "semestre",
      "major",
      "subject"
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
    if (error.name == "CastError")
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
        code: 126,
        error: "id cannot be empty"
      });

    await Document.remove({
      _id: req.params.id
    });
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    if (error.name == "CastError")
      return res.status(400).json({
        error: error.message
      });

    return res.status(500).end();
  }
}
