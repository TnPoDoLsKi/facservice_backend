import { create, getOne, update, remove, getAll } from "./sectionController";

export default function(router) {
  router.get("/sections", getAll);
  router.get("/sections/:id", getOne);
  router.post("/sections", create);
  router.put("/sections/:id", update);
  router.delete("/sections/:id", remove);
}
