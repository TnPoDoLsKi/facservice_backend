import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getDocBySubjectByType,
  getDocByUser,
  getAllByStatus
} from "./documentController";
import { upload } from "../../services/uploadService";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  
  router.get("/documents/byStatus/:status", getAllByStatus);
  router.get("/documents/bySubject/:subjectId/byType/:type", getDocBySubjectByType);
  router.get("/documents/byUser", isLoggedIn, getDocByUser);

  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);
  
  router.post("/documents", isLoggedIn,  create);
  router.post("/documents/upload", isLoggedIn, upload);

  router.put("/documents/:id", isLoggedIn, isAdmin, update);
  router.delete("/documents/:id", isLoggedIn, isAdmin, remove);
}
