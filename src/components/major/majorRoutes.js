import {
  getOne,
  create,
  update,
  remove,
  getAll,
  getOneByName
} from "./majorController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/majors", getAll);
  router.get("/majors/:id", getOne);
  router.get("/majors/byName/:name", getOneByName);
  router.post("/majors", create);
  router.put("/majors/:id", update);
  router.delete("/majors/:id", remove);
}
