import { create, getOne, update, remove, getAll } from "./sectionController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/sections", getAll);
  router.get("/sections/:id", getOne);
  router.post("/sections", isLoggedIn, isAdmin, create);
  router.put("/sections/:id", isLoggedIn, isAdmin, update);
  router.delete("/sections/:id", isLoggedIn, isAdmin, remove);
}
