import { isLoggedIn } from "../../services/middlewares";
import { search } from "searchController";

export default function(router) {
  router.get("/api/search", isLoggedIn, search);
}
