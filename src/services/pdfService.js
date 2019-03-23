import PdfPrinter from "pdfmake";
import fs from "fs";

export async function convert(req, res) {
  try {
    var content = [];

    var printer = new PdfPrinter();

    req.body.filesStaging.forEach(function (imagePath, index) {
      content[index] = {
        image: "public" + imagePath.replace("http://localhost:3000", ""),
        width: 595,
        height: 842
      }
    })

    var docDefinition = {
      content: content,
      pageMargins: [0, 0, 0, 0]
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(
      fs.createWriteStream(
        "public/pdfs/" + req.body.documentTitle.replace(/ /g, "_")
      )
    );
    pdfDoc.end();

    var filePath =
      "http://igc.tn:3005/public/pdfs/" +
      req.body.documentTitle.replace(/ /g, "_");
    res.json(filePath);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}