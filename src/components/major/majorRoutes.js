import {
  getOne,
  create,
  update,
  remove,
  getAll,
  addSubjects
} from "./majorController";

export default function(router) {
  router.get("/majors", getAll); /* tested */
  router.get("/majors/:id", getOne); /* tested */
  router.post("/majors", create);
  router.put("/majors/:id", update); /* tested */
  router.delete("/majors/:id", remove); /* tested */
  router.put("/majors/:id/subjects/", addSubjects); /* Done */
}
