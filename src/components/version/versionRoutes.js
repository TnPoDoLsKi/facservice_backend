import { getAll, getLast, getFromVersion, create, update, remove } from "./versionController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function (router) {
  router.get("/versions", getAll);
  router.get("/version/last", getLast);
  router.get("/version/:clientVersion", getFromVersion);

  router.post("/version", isLoggedIn, isAdmin, create);
  router.put("/version/:id", isLoggedIn, isAdmin, update);
  router.delete("/version/:id", isLoggedIn, isAdmin, remove);
}
