import {
  create,
  getOne,
  update,
  remove,
  getAll,
  addCorrections,
  getCorrections,
  getDocByType
} from "./documentController";
import { upload } from "../../services/uploadService";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);
  router.get("/documents/corrections/:id", getCorrections);
  router.get("/documents/subject/:id", getDocByType);
  router.post("/documents", isLoggedIn, create);
  router.post("/documents/upload", isLoggedIn, upload);
  router.post("/documents/corrections/:id", isLoggedIn, addCorrections);
  router.put("/documents/:id", isLoggedIn, isAdmin, update);
  router.delete("/documents/:id", isLoggedIn, isAdmin, remove);
}
