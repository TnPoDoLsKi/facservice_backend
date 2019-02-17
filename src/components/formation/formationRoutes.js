import {
  getOne,
  create,
  update,
  remove,
  getAll,
  getFormationLevels,
  getFormationSections
} from "./formationController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/formations", getAll);
  router.get("/formations/:id", getOne);
  router.get("/formations/:id/levels", getFormationLevels);
  router.get("/formations/:fId/levels/:lId/sections", getFormationSections);
  router.post("/formations", isLoggedIn, isAdmin, create);
  router.put("/formations/:id", isLoggedIn, isAdmin, update);
  router.delete("/formations/:id", isLoggedIn, isAdmin, remove);
}
