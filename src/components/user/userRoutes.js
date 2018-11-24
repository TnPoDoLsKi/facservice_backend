import {
  getByType,
  isAdmin,
  createUser,
  updateUser,
  deleteUser
} from "./userController";

export default function(router) {
  router.get("/api/users/:type", isAdmin, getByType);
  router.post("/api/users", createUser);
  router.put("/api/users/:id", updateUser);
  router.delete("/api/users/:id", deleteUser);
}
