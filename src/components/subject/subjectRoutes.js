import { create, getOne, update, remove, getAll } from "./subjectController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/subjects", getAll);
  router.get("/subjects/:id", getOne);
  router.post("/subjects", create);
  router.put("/subjects/:id", update);
  router.delete("/subjects/:id", remove);
}
