import _ from "lodash";
import User from "../user/user";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/env";
import Major from "../major/major";
// import { upload } from "../../services/uploadService";

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
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
export async function create(req, res) {
  try {
    const user = _.pick(req.body, "email", "type", "firstName", "lastName");
    user.hashedPassword = req.body.password;

    console.log(req.body);

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
      }
    );

    if (req.body.major) {
      await Major.findOne(
        {
          name: req.body.major
        },
        (err, foundMajor) => {
          if (err) {
            return res.status(500).end();
          } else if (!foundMajor) {
            return res.status(400).end();
          } else {
            user.major = foundMajor._id;
          }
        }
      );
    }

    await User.create(user);

    return res.status(201).end();
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
            return res.status(400).end();
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
