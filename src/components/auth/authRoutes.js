import { create, signIn, signOut } from "./authController";

export default function(router) {
  router.post("/auth/signup", create);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", signOut);
}
