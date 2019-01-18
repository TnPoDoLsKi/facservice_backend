import { create, getOne, update, remove, getAll } from "./documentController";
import { upload } from "../../services/uploadService";
export default function(router) {
  router.get("/documents", getAll);
  router.get("/documents/:id", getOne);
  router.post("/documents", create);
  router.post("/documents/upload", upload);
  router.put("/documents/:id", update);
  router.delete("/documents/:id", remove);
}
