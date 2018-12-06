import { create, getOne, update, remove, getAll } from "./documentController";

export default function(router) {
  router.get("/documents", getAll);
  router.get("/document/:id", getOne);
  router.post("/document", create);
  router.put("/document/:id", update);
  router.delete("/document/:id", remove);
}
