import {
  getAll,
  getByType,
  update,
  remove,
  getCurrent
} from "./userController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/user", getCurrent);
  router.get("/users", isLoggedIn, isAdmin, getAll);
  router.get("/users/:type", isLoggedIn, isAdmin, getByType);

  router.put("/users", isLoggedIn, update);
  router.delete("/users/:id", isLoggedIn, isAdmin, remove);
}
