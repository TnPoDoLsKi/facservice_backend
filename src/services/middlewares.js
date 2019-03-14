import { User } from '../config/models'

export async function isLoggedIn(req, res, next) {
  try {
    let token = null;

    if ("authorization" in req.headers) {
      const bearer = req.headers["authorization"];
      token = bearer.split(" ")[1];
    } else if (req.session && req.session.token) {
      token = req.session.token;
    } else {
      return res.status(401).json({
        error: "Authorization token required !"
      });
    }

    const user = await User.findOne({ token: token })

    if (!user)
      return res.status(401).end()

    req.user = user
    return next()

  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

export function isAdmin(req, res, next) {
  try {

    if (req.user.type == 'admin')
      return next()

    return res.status(401).end()

  } catch (error) {
    res.status(500).end();
  }
}
