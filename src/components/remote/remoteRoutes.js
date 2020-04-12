import { resetcollections } from "./remoteController";
import { isLoggedIn, isAdmin } from "../../services/middlewares";

export default function (router) {
  router.post("/remote/resetdb", isLoggedIn, isAdmin, resetcollections)
}
