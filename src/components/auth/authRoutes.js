import { signUp, signIn, signOut } from "./authController";
import { isLoggedIn } from '../../services/middlewares'

export default function (router) {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", isLoggedIn, signOut);
}
