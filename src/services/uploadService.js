import formidable from "formidable";
import path from "path";

// upload
const config = {
  // storage
  uploadDir: path.join(__dirname, "../../public", "uploads"),
  maxFileSize: 10 * 1024 * 1024,
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
    const url = host + "/uploads/" + file.path.split("\\").pop();
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
      console.log("Reachead end");
      res.json(fileUrls);
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send(error);
  }
}
// end
