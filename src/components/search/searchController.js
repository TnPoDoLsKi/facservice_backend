import Document from "../document/document";
import Fuse from "fuse.js";

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

      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
