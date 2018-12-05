import { getByType, isAdmin, createUser, updateUser, deleteUser, signIn, signOut } from "./userController";

export default function(router) {
    router.get("/api/users/:type", isAdmin, getByType);
    router.post("/api/users/signup", createUser);
    router.put("/api/users/:id", updateUser);
    router.delete("/api/users/:id",  deleteUser);
    router.post('/api/auth/signin', signIn);
    router.post('/api/auth/signout', signOut)
}