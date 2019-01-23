import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getDocCorrections
} from "./documentController";
import { upload } from "../../services/uploadService";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);
  router.get("/documents/:id/corrections", getDocCorrections);
  router.post("/documents", isLoggedIn, create);
  router.post("/documents/upload", isLoggedIn, upload);
  router.put("/documents/:id", isLoggedIn, isAdmin, update);
  router.delete("/documents/:id", isLoggedIn, isAdmin, remove);
}
