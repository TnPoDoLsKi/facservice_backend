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
  router.get("/majors", getAll); /* tested */
  router.get("/majors/:id", getOne); /* tested */
  router.post("/majors", isLoggedIn, isAdmin, create);
  router.put("/majors/:id", isLoggedIn, isAdmin, update); /* tested */
  router.delete("/majors/:id", isLoggedIn, isAdmin, remove); /* tested */
  router.put("/majors/:id/subjects/", isLoggedIn, isAdmin, addSubjects); /* Done */
}
