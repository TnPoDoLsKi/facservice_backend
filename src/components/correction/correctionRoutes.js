import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getDocCorrections
} from "./correctionController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/corrections", getAll);
  router.get("/documents/:id/corrections", getDocCorrections);
  router.get("/corrections/:id", getOne);
  router.post("/corrections", isLoggedIn, create);
  router.put("/corrections/:id", isLoggedIn, isAdmin, update);
  router.delete("/corrections/:id", isLoggedIn, isAdmin, remove);
}
