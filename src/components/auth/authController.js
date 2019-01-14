import _ from "lodash";
import User from "../user/user";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/env";
import Major from "../major/major";
//import { upload } from "../../services/uploadService";

export async function create(req, res) {
  try {
    let user = _.pick(
      req.body,
      "email",
      "hashedPassword",
      "type",
      "firstName",
      "lastName"
    );

    await User.findOne({ email: user.email }, (err, user) => {
      if (err) {
        return res.status(500).end();
      } else if (user) {
        return res.status(208).end();
      }
    });

    if (req.body.major) {
      await Major.findOne({ name: req.body.major }, (err, foundMajor) => {
        if (err) {
          return res.status(400).end();
        } else {
          user.major = foundMajor._id;
        }
      });
    }

    await User.create(user);

    return res.status(201).end();
  } catch (err) {
    res.status(500).end();
  }
}

export async function signIn(req, res) {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(400).end();
      }
      user.comparePassword(req.body.hashedPassword, (err, equal) => {
        if (equal && !err) {
          const userData = _.pick(
            user,
            "firstName",
            "lastName",
            "email",
            "type",
            "major",
            "avatar"
          );
          let token = jwt.sign(userData, SECRET, {
            expiresIn: 250000
          });
          req.session.token = token;
          req.session.userData = userData;
          return res.json({ user: userData, token: token });
        } else {
          return res.status(400).end();
        }
      });
    });
  } catch (err) {
    return res.status(500).end();
  }
}

export async function signOut(req, res) {
  try {
    req.session.destroy();
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}
