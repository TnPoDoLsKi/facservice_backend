import {
  getOne,
  create,
  update,
  remove,
  getAll,
  getOneByName,
  getByLevel,
  getAllWithInReviewInfos
} from "./majorController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/majors", getAll);
  router.get("/majors/byLevel/:level", getByLevel);
  router.get("/majors/byName/:name", getOneByName);
  router.get("/majors/withInReviewInfos", getAllWithInReviewInfos);
  router.get("/majors/:id", getOne);

  router.post("/majors", isLoggedIn, isAdmin, create);
  router.put("/majors/:id", isLoggedIn, isAdmin, update);
  router.delete("/majors/:id", isLoggedIn, isAdmin, remove);
}
