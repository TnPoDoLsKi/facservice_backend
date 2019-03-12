import { create, getOne, update, remove, getAll, getAllByDocument } from "./correctionController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/corrections", getAll);
  router.get("/corrections/:id", getOne);
  router.get("/corrections/byDocument/:documentId", getAllByDocument);

  router.post("/corrections", create);
  router.put("/corrections/:id", update);
  router.delete("/corrections/:id", remove);
}
