import Document from "../document/document";

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export async function search(req, res) {
  try {
    if (!req.query.search) {
      return res.status(400).end();
    } else {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");

      let documents = await Document.find({ title: regex });

      return res.status(200).json(documents);
    }
  } catch (err) {
    return res.status(500).end();
  }
}
