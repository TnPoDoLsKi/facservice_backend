import { create, getOne, update, remove, getAll } from "./documentController";
import { upload } from "../../services/uploadService";
export default function(router) {
  router.get("/documents", getAll);
  router.get("/document/:id", getOne);
  router.post("/document/upload", upload);
  router.post("/document/create", create);
  router.put("/document/:id", update);
  router.delete("/document/:id", remove);
}
