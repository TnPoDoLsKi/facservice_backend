import { create, getOne, update, remove, getAll, getByFormation } from "./levelController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function (router) {
  router.get("/levels", getAll);
  router.get("/levels/:id", getOne);
  router.get("/levels/byFormation/:formation", getByFormation);

  router.post("/levels", isLoggedIn, isAdmin, create);
  router.put("/levels/:id", isLoggedIn, isAdmin, update);
  router.delete("/levels/:id", isLoggedIn, isAdmin, remove);
}
