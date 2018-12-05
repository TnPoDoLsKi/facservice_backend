import { getByType, createUser, updateUser, deleteUser, signIn, signOut } from "./userController";
import { isLoggedIn } from "../../services/middlewares/isLoggedIn";
import { isAdmin } from "../../services/middlewares/isAdmin";

export default function(router) {
    router.get("/api/users/:type",isLoggedIn, isAdmin, getByType);
    router.post("/api/users/signup", isLoggedIn, createUser);
    router.put("/api/users/:id",isLoggedIn, updateUser);
    router.delete("/api/users/:id",isLoggedIn,  deleteUser);
    router.post('/api/auth/signin', signIn);
    router.post('/api/auth/signout', signOut)
}