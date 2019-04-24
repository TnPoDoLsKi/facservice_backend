import PdfPrinter from "pdfmake";
import fs from "fs";

export async function convert(req, res) {
  try {
    var content = [];

    var printer = new PdfPrinter();

    await req.body.filesStaging.forEach(async function(imagePath, index) {
      content[index] = {
        image: "public" + imagePath.replace("https://facservice.tn", ""),
        width: 595,
        height: 842
      };
    });

    var docDefinition = {
      content: content,
      info: {
        title: req.body.documentTitle,
        author: "IGC"
      },
      pageMargins: [0, 0, 0, 0]
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(
      fs.createWriteStream(
        "public/pdfs/" + req.body.documentTitle.replace(/ /g, "_") + ".pdf"
      ),
      {
        encoding: "utf16"
      }
    );
    pdfDoc.end();

    var filePath =
      "https://facservice.tn/pdfs/" +
      req.body.documentTitle.replace(/ /g, "_") +
      ".pdf";
    res.json(filePath);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
// req.headers.host === "igc.tn:3005" ? "http://igc.tn:3005/pdfs/" :
