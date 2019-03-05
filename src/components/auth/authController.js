import _ from "lodash";
import User from "../user/user";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/env";
import Major from "../major/major";
import mailer from "../../services/mailer";

/**
 * @api {post} /auth/signup Create User
 * @apiName Signup
 * @apiGroup Auth
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} type User type [admin, student, prof]
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} major User major
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@gmail",
 *      "password": "test123",
 *      "type": "admin",
 *      "firstName": "admin",
 *      "lastName": "admin",
 *      "major": "Prepa-A1"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 * @apiErrorExample {json} User already exists
 *    HTTP/1.1 208 Already Reported
 * @apiErrorExample {json} Major specified doesn't exist
 *    HTTP/1.1 406 Not Acceptable
 * @apiErrorExample {json} User info cannot be empty
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function create(req, res) {
  try {

    if (
      !req.body.email ||
      !req.body.type ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.password ||
      !req.body.major
    ) {
      return res.status(400).end();
    }

    let user = _.pick(
      req.body,
      "email",
      "type",
      "firstName",
      "lastName",
      "password"
    );

    await Major.findOne(
      {
        name: req.body.major
      },
      (err, foundMajor) => {
        if (err) {
          return res.status(500).end();
        } else if (!foundMajor) {
          return res.status(406).end();
        } else {
          user.major = foundMajor._id;
        }
      })

    await User.findOne(
      {
        email: user.email
      },
      (err, user) => {
        if (err) {
          return res.status(500).end({
            error: err
          });
        } else if (user) {
          return res.status(208).end();
        }
      })

    const userCreated = await User.create(user);

    const token = jwt.sign({ id: userCreated._id }, SECRET, {
      expiresIn: 604800
    });

    return res.status(201).json({ token: token });

  } catch (err) {
    res.status(500).end();
    console.log(err);
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
 *      "password": "test123"
 *    }
 * @apiSuccess {String} token Signin token
 * @apiSuccess {Object} user User information
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *          "firstName": "admin",
 *          "lastName": "admin",
 *          "email": "test@gmail.com",
 *          "type": "admin"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJhZG1pbiIsImxhc3ROYW1lIjoiYWRtaW4iLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidHlwZSI6InN0dWRlbnQiLCJpYXQiOjE1NDgyNTA3OTUsImV4cCI6MTU0ODg1NTU5NX0.kHn_wwhlgNyR7-CI0S57GDElALmJ9YWxnkRUZ1pga0s"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} User specified doesn't exist
 *    HTTP/1.1 400 Bad Request
 */

export async function signIn(req, res) {
  try {
    await User.findOne(
      {
        email: req.body.email
      },
      (err, user) => {
        if (err) {
          return res.status(500).end(err);
        }
        if (!user) {
          return res.status(400).end();
        }

        user.comparePassword(req.body.password, (err, equal) => {
          if (equal && !err) {
            const userData = _.pick(
              user,
              "_id",
              "firstName",
              "lastName",
              "email",
              "type",
              "major",
              "avatar"
            );
            const token = jwt.sign(userData, SECRET, {
              expiresIn: 604800
            });

            req.session.token = token;
            req.session.userData = userData;

            return res.json({
              user: userData,
              token: token
            });
          } else {
            console.log(equal, err);
            return res.status(401).end();
          }
        });
      }
    );
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {post} /auth/signout Sign Out
 * @apiName Signout
 * @apiGroup Auth
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function signOut(req, res) {
  try {
    req.session.destroy();
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}

export function testMailer(req, res) {
  const error = mailer("test", "hello friend");
  if (error) {
    res.status(400).end();
  } else {
    res.status(200).end();
  }
}

export async function activeAccount(req, res) {
  if (req.params.token) {
    jwt.verify(req.params.token, SECRET, (err, user) => {
      if (err) {
        res.status(400).end();
      } else {
        User.update({ _id: user.id }, { $set: { activated: true } }, error => {
          if (error) {
            return res.status(500).end();
          }
          return res.status(200).end();
        });
      }
    });
  }
}
