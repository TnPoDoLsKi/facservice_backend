import {
  getOne,
  create,
  update,
  remove,
  getAll,
 /* addSubjects */
} from "./majorController";

export default function(router) {
  router.get("/majors", getAll); /* TO DO test */
  router.get("/majors/:id", getOne); /* TO DO test*/
  router.post("/majors", create);
  router.put("/majors/:id", update); /* TO DO test */
  router.delete("/majors/:id", remove); /* TO DO test */
/*  router.put("/majors/:id/subjects/", addSubjects); /* TO DO */
}
