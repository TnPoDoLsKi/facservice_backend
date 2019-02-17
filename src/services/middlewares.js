import jwt from "jsonwebtoken";
import { SECRET } from "../config/env";
import atob from "atob";

export function isLoggedIn(req, res, next) {
  try {
    if ("authorization" in req.headers) {
      const bearer = req.headers["authorization"];
      const token = bearer.split(" ")[1];

      if (!token) {
        return res.status(403).send({
          auth: false,
          message: "No token provided"
        });
      } else {
        jwt.verify(token, SECRET, (err, tokenDecoded) => {
          if (err) {
            return res.status(401).json({
              error: err.name
            });
          }
          // console.log("here", tokenDecoded);
          next();
        });
      }
    } else {
      return res.status(401).json({
        error: "Authorization required !"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

export function isAdmin(req, res, next) {
  try {
    if ("authorization" in req.headers) {
      const bearer = req.headers["authorization"];

      const token = bearer.split(" ")[1];

      if (!token) {
        return res.status(403).send({
          auth: false,
          message: "No token provided"
        });
      } else {
        const base64Url = token.split(".")[1];

        const base64 = base64Url.replace("-", "+").replace("_", "/");

        const payload = JSON.parse(atob(base64));

        if (payload.type === "admin") {
          next();
        } else {
          res.status(403).end();
        }
      }
    } else {
      res.status(401).json({
        error: "Authorization required !"
      });
    }
  } catch (error) {
    res.status(500).end();
  }
}
