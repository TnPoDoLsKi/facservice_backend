import { create, getOne, update, remove, getAll } from "./levelController";

export default function(router) {
  router.get("/level", getAll);
  router.get("/level/:id", getOne);
  router.post("/level", create);
  router.put("/level/:id", update);
  router.delete("/level/:id", remove);
}
