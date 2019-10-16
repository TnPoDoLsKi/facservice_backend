import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getAllByDocument,
  getAllByStatus,
  getByUser,
  getAllApprovedBySubject
} from "./correctionController";
import { convert } from "../../services/pdfService";

import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function(router) {
  router.get("/corrections", getAll);
  router.get("/corrections/byStatus/:status", isLoggedIn, isAdmin, getAllByStatus);
  router.get("/corrections/approved/bySubject/:subjectId", isLoggedIn, isAdmin, getAllApprovedBySubject);
  router.get("/corrections/:id", getOne);
  router.get("/corrections/byDocument/:documentId", getAllByDocument);
  router.get("/corrections/byUser/:userId", getByUser);

  router.post("/corrections/convert", isLoggedIn, convert);
  router.post("/corrections", isLoggedIn, create);
  router.put("/corrections/:id", isLoggedIn, isAdmin, update);
  router.delete("/corrections/:id", isLoggedIn, isAdmin, remove);
}
