import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getDocBySubject,
  getDocBySubjectByType,
  getDocByUser,
  getAllByStatus,
  getDocByMajor,
  search
} from "./documentController";
import { upload } from "../../services/uploadService";
import { convert } from "../../services/pdfService";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get(
    "/documents/byStatus/:status",
    isLoggedIn,
    isAdmin,
    getAllByStatus
  );
  router.get("/documents/bySubject/:subjectId", getDocBySubject);
  router.get(
    "/documents/bySubject/:subjectId/byType/:type?",
    getDocBySubjectByType
  );
  router.get("/documents/byMajor/:majorID", getDocByMajor);
  router.get("/documents/byUser", isLoggedIn, getDocByUser);
  router.get("/documents/search/", search);

  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);

  router.post("/documents", isLoggedIn, create);
  router.post("/documents/upload", isLoggedIn, upload);
  router.post("/documents/convert", convert);

  router.put("/documents/:id", isLoggedIn, update);
  router.delete("/documents/:id", isLoggedIn, isAdmin, remove);
}
