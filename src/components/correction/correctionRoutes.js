import {
  create,
  getOne,
  update,
  remove,
  getAll,
  getDocCorrections
} from "./correctionController";

export default function(router) {
  router.get("/corrections", getAll);
  router.get("/documents/:id/corrections", getDocCorrections);
  router.get("/corrections/:id", getOne);
  router.post("/corrections", create);
  router.put("/corrections/:id", update);
  router.delete("/corrections/:id", remove);
}
