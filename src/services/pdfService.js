import PdfPrinter from 'pdfmake'
import fs from 'fs'

export async function convert(req, res) {
    try {
        var fonts = {
            Roboto: {
                normal: 'public/fonts/Roboto-Regular.ttf',
                bold: 'public/fonts/Roboto-Medium.ttf',
                italics: 'public/fonts/Roboto-Italic.ttf',
                bolditalics: 'public/fonts/Roboto-MediumItalic.ttf'
            }
        };
        var imagesPaths = req.body.filesStaging;
        var content = [];

        var printer = new PdfPrinter(fonts);

        imagesPaths.forEach(function (imagePath, index) {
            content[index] = {
                image: "public" + imagePath.replace("http://localhost:3000", ""),
                width: 595,
                height: 842
            }
        })

        var docDefinition = {
            content: content,
            pageMargins: [0, 0, 0, 0],
        };

        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream("public/pdfs/" + req.body.documentTitle.replace(/ /g, "_")));
        pdfDoc.end();

        var filePath = "http://localhost:3000/public/pdfs/" + req.body.documentTitle.replace(/ /g, "_");
        res.json(filePath)
    } catch (error) {
        console.log(error)
        return res.status(500).end();
    }
}