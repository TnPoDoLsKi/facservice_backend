import jwt from "jsonwebtoken";
import { SECRET } from "../../config/env";

export function isLoggedIn(req, res, next) {
  if ("authorization" in req.headers) {
    let bearer = req.headers["authorization"];
    let token = bearer.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "No token provided"
      });
    } else {
      jwt.verify(token, SECRET, (err, tokenDecoded) => {
        if (err) return res.status(500).send();
        console.log(tokenDecoded);
        next();
      });
    }
  } else {
    return res.status(400).end();
  }
}
