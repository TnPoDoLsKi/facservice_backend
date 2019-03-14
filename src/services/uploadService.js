import formidable from "formidable";
import path from "path";

/**
 * @api {post} /documents/upload Upload a file
 * @apiGroup Documents
 * @apiName Upload
 * @apiParam {File} files File to upload
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Uploaded
 *    HTTP/1.1 200 OK
 * [ "http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg", "http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg" ]
 *
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

// upload
const config = {
  // storage
  uploadDir: path.join(__dirname, "../../public", "uploads"),
  maxFileSize: 100 * 1024 * 1024,
  maxFieldsSize: 100 * 1024 * 1024,
  multiple: true
};
export async function upload(req, res) {
  const fileUrls = [];
  // abort handler
  const _abortHandler = () => {
    const error = new Error("request canceled");
    res.status(444).send({
      error
    });
  };

  // error handler
  const _errorHandler = error => {
    res.status(500).send({
      error
    });
  };

  /* 
     file handler 
      @params: 
        name: filed name that contains the files,
        file: file meta 
    */
  const _fileHandler = (name, file) => {
    const host = req.protocol + "://" + req.headers.host;
    let url = "";
    if (req.headers.host === "igc.tn:3005") {
      url = host + "/uploads/" + file.path.split("/").pop();
    } else {
      url = host + "/uploads/" + file.path.split("\\").pop();
    }
    fileUrls.push(url);
    return fileUrls;
  };
  /* 
     field handler 
    */
  const _fieldHandler = (name, value) => {
    req.form = req.form || {};
    req.form[name] = value;
  };
  // midleware
  try {
    const form = new formidable.IncomingForm(config);
    form.keepExtensions = true;
    form.parse(req);
    form.on("file", _fileHandler);
    form.on("field", _fieldHandler);
    form.on("error", _errorHandler);
    form.on("aborted", _abortHandler);
    form.on("end", () => {
      console.log("uploaded");
      res.json(fileUrls);
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send(error);
  }
}
// end
