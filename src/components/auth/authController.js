import _ from "lodash";
import crypto from "crypto";
import { User, Major } from "../../config/models";
import { SECRET } from "../../config/env";
import jwt from "jsonwebtoken";
import mailer from "../../services/mailer";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @api {post} /auth/signup Signup
 * @apiName Signup
 * @apiGroup Auth
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} major User major (id)
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@gmail",
 *      "password": "test1234",
 *      "firstName": "flen",
 *      "lastName": "ben felten",
 *      "major": "5c8269c447baab426f6cbcfc"
 *    }
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    email already exist
 *    wrong major id
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function signUp(req, res) {
  try {
    const user = _.pick(
      req.body,
      "email",
      "firstName",
      "lastName",
      "password",
      "major"
    );

    if (
      !user.email ||
      !user.password ||
      !user.major ||
      !user.firstName ||
      !user.lastName
    )
      return res.status(400).json({ error: "missing body params" });

    if (!emailRegex.test(user.email))
      return res.status(400).json({ error: "Wrong email form" });

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser)
      return res.status(400).json({ error: "email already exist" });

    if (user.password.length < 8)
      return res
        .status(400)
        .json({ error: "Password should contain eight characters or more" });

    const major = await Major.findOne({ _id: user.major });

    if (!major) return res.status(400).json({ error: "wrong major id" });

    const userCreated = await User.create(user);

    const token = jwt.sign({ email: userCreated.email }, SECRET, {
      expiresIn: 604800
    });

    const link = `http://igc.tn:3005/api/activate/${token}`;
    if (mailer(userCreated, link)) {
      return res.status(400).json({ error: "error while sending email" });
    } else {
      return res.status(201).end();
    }
  } catch (error) {
    if (error.name == "CastError")
      return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

/**
 * @api {post} /auth/signin Sign In
 * @apiName Signin
 * @apiGroup Auth
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@gmail.com",
 *      "password": "test1234"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
          "firstName": "Wael",
          "lastName": "Ben Taleb",
          "major": "5c8265367e19d73dba8355a6",
          "majorName": "FIA2-GL",
          "token": "0fa1b8121408dd0266b61778650723338852a3b8de14f1005169b8637aef7707"
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 *    Wrong password
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    Wrong email address
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function signIn(req, res) {
  try {
    if (!(req.body.email && req.body.password))
      return res.status(400).json({ error: "missing body params" });

    let user = await User.findOne({ email: req.body.email }).populate("major");

    if (!user) return res.status(400).json({ error: "Wrong email address" });

    if (!user.activated)
      return res.status(403).json({ error: "email not activated" });

    if (!user.comparePassword(req.body.password))
      return res.status(401).json({ error: "Wrong password" });

    user.token = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(48).toString("hex"))
      .digest("hex");
    await user.save();

    req.session.token = user.token;

    user = user.toJSON();
    user = _.pick(user, "firstName", "lastName", "major", "token", "email");
    user.majorName = user.major.name;
    user.major = user.major._id;

    return res.json(user);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {post} /auth/signout Sign Out
 * @apiName Signout
 * @apiGroup Auth
 * @apiHeader Authorization Bearer Token
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function signOut(req, res) {
  try {
    req.user.token = null;
    delete req.session.token;

    await req.user.save();

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function activeAccount(req, res) {
  if (req.params.token) {
    jwt.verify(req.params.token, SECRET, (err, user) => {
      if (err) {
        res.status(400).end();
      } else {
        User.update(
          { email: user.email },
          { $set: { activated: true } },
          error => {
            if (error) {
              return res.status(500).end();
            }
            if (req.device.type === "desktop") {
              res.redirect("http://facservice.tn/login");
            } else {
              res.redirect("http://facservice.tn/activated");
            }
          }
        );
      }
    });
  }
}
