import { search } from "./searchController";

export default function(router) {
  router.get("/search", search);
}
