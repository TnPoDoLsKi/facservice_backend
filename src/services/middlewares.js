import { User } from "../config/models";

export async function isLoggedIn(req, res, next) {
  try {
    let token = 'c9b8841b1ee2261e25b4182998867de3b4c823e18da3375b1d6dd0e5df3591f8';

    if ("authorization" in req.headers) {
      const bearer = req.headers["authorization"];
      token = bearer.split(" ")[1];
    } else if (req.session && req.session.token) {
      token = req.session.token;
    }

    if (!token) {
      return res.status(401).json({
        error: "Authorization token required !"
      });
    }

    const user = await User.findOne({ token: token });

    if (!user) return res.status(401).end();

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

export function isAdmin(req, res, next) {
  try {
    if (req.user.type == "admin") return next();

    return res.status(401).end();
  } catch (error) {
    res.status(500).end();
  }
}
