import {
  getOne,
  create,
  update,
  remove,
  getAll,
  addSubjects
} from "./majorController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/majors", getAll);
  router.get("/majors/:id", getOne);
  router.post("/majors", isLoggedIn, isAdmin, create);
  router.put("/majors/:id", isLoggedIn, isAdmin, update);
  router.delete("/majors/:id", isLoggedIn, isAdmin, remove);
  router.put("/majors/:id/subjects/", isLoggedIn, isAdmin, addSubjects);
}
