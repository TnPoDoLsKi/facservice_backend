import { getAll, getByType, create, update, remove } from "./userController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/api/users", isLoggedIn, isAdmin, getAll);
  router.get("/api/users/:type", isLoggedIn, isAdmin, getByType);
  router.put("/api/users/:id", isLoggedIn, update);
  router.delete("/api/users/:id", isLoggedIn, remove);
}
