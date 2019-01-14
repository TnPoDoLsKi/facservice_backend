import { getAll, getByType, update, remove } from "./userController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/users", isLoggedIn, isAdmin, getAll);
  router.get("/users/:type", isLoggedIn, isAdmin, getByType);
  router.put("/users/:id", isLoggedIn, update);
  router.delete("/users/:id", /* isLoggedIn,*/ remove);
}
