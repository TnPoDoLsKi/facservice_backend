import { create, signIn, signOut, testMailer, activeAccount } from "./authController";

export default function(router) {
  router.post("/auth/signup", create);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", signOut);
  router.get("/mailing", testMailer);
  router.get("/activate/:token", activeAccount);
}
