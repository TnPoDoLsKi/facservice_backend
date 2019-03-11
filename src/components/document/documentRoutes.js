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
  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);
  
  router.get("/documents/byStatus/:status", getAllByStatus);
  router.get("/documents/bySubject/:subjectId/byType/:type", getDocBySubjectByType);
  router.get("/documents/byUser/:userId", getDocByUser);
  
  router.post("/documents", create);
  router.put("/documents/:id", update);
  router.post("/documents/upload", upload);
  router.delete("/documents/:id", remove);
}
