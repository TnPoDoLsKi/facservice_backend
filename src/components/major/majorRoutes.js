import {
  getOne,
  create,
  update,
  remove,
  getAll,
  getOneByName,
  getByLevel
} from "./majorController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function (router) {
  router.get("/majors", getAll);
  router.get("/majors/:id", getOne);
  router.get("/majors/byLevel/:level", getByLevel);
  router.get("/majors/byName/:name", getOneByName);

  router.post("/majors", isLoggedIn, isAdmin, create);
  router.put("/majors/:id", isLoggedIn, isAdmin, update);
  router.delete("/majors/:id", isLoggedIn, isAdmin, remove);
}
