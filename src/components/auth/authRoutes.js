import { create, signIn, signOut } from "./authController";

export default function(router) {
  router.post("/api/auth/signup", create);
  router.post("/api/auth/signin", signIn);
  router.post("/api/auth/signout", signOut);
}
