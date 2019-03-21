import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getAllByDocument,
  getAllByStatus
} from "./correctionController";
import { convert } from "../../services/pdfService";

import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/corrections", getAll);
  router.get("/corrections/byStatus/:status", getAllByStatus);
  router.get("/corrections/:id", getOne);
  router.get("/corrections/byDocument/:documentId", getAllByDocument);

  router.post("/corrections", create);
  router.post("/corrections/convert", convert);

  router.put("/corrections/:id", update);
  router.delete("/corrections/:id", isLoggedIn, isAdmin, remove);
}
