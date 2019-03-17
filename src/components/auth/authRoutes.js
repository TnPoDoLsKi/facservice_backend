import {
  signUp,
  signIn,
  signOut,
  testMailer,
  activeAccount
} from "./authController";
import { isLoggedIn } from "../../services/middlewares";

export default function(router) {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
  router.get("/mailing", testMailer);
  router.get("/activate/:token", activeAccount);
  router.post("/auth/signout", isLoggedIn, signOut);
}
