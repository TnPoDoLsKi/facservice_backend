import { create, getOne, update, remove, getAll } from "./levelController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/levels", getAll);
  router.get("/levels/:id", getOne);
  router.post("/levels", create);
  router.put("/levels/:id", update);
  router.delete("/levels/:id", remove);
}
