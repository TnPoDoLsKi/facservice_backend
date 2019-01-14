import { getOne, create, update, remove, getAll } from "./formationController";

export default function(router) {
  router.get("/formations", getAll);
  router.get("/formations/:id", getOne);
  router.post("/formations", create);
  router.put("/formations/:id", update);
  router.delete("/formations/:id", remove);
}
