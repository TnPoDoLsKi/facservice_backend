import { signUp, signIn, signOut, activeAccount, verifyAccess } from "./authController";
import { isLoggedIn } from "../../services/middlewares";

export default function (router) {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", isLoggedIn, signOut);

  router.get("/activate/:token", activeAccount);
  router.get("/verifyAccess", isLoggedIn, verifyAccess);
}
