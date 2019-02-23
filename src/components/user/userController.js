import { User, Major } from "../../config/models";
import _ from "lodash";
import mongoose from "mongoose";

/**
 * @api {get} /users/:type Get all users by type
 * @apiGroup Users
 * @apiParam {String} type User type (student or prof)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "type": "student",
        "deleted": false,
        "_id": "5c2426542a7e2f361896f812",
        "email": "mohamed@test.com",
        "firstName": "mohamed",
        "lastName": "mohamed",
        "major": null
    },
    {
        "type": "student",
        "deleted": false,
        "_id": "5c43b2e3ab4ef507440f942c",
        "email": "test@gmail.com",
        "firstName": "admin",
        "lastName": "admin"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Type param cannot be empty
 *    HTTP/1.1 400 Not Found
 */

export async function getByType(req, res) {
  try {
    if (
      !req.params.type ||
      (req.params.type !== "prof" && req.params.type !== "student")
    ) {
      return res.status(400).end();
    }

    const users = await User.find({
      type: req.params.type
    })
      .select("-hashedPassword")
      .populate("major")
      .exec();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {get} /users Get all users
 * @apiGroup Users
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
    {
        "type": "student",
        "deleted": false,
        "_id": "5c2426542a7e2f361896f812",
        "email": "mohamed@test.com",
        "firstName": "mohamed",
        "lastName": "mohamed",
        "major": null
    },
    {
        "type": "admin",
        "deleted": false,
        "_id": "5c2426692a7e2f361896f813",
        "email": "ghada@test.com",
        "firstName": "ghada",
        "lastName": "ghada",
        "major": null
    },
    {
        "type": "student",
        "deleted": false,
        "_id": "5c43b2e3ab4ef507440f942c",
        "email": "test@gmail.com",
        "firstName": "admin",
        "lastName": "admin"
    }
]
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const users = await User.find()
      .select("-hashedPassword")
      .populate("major")
      .exec();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

export async function getCurrent(req, res) {
  try {
    const user = _.pick(req.user, ["_id", "firstName", "lastName", "email"]);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {put} /users/:id Update user info
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} type User type(prof, student)
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} avatar User profile picture file path
 * @apiParam {String} major User major (id)
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@test.com",
 *      "password": "test123",
 *      "type": "student",
 *      "firstName": "foulen",
 *      "lastName": "Ben foulen",
 *      "avatar": "/uploads/5c41df5e0000d416fc5158fd.jpg",
 *      "major": "5c3f8bee091f3c3290ac10b3"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 Updated
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function update(req, res) {
  try {
    const userData = _.pick(
      req.body,
      "email",
      "type",
      "firstName",
      "lastName",
      "avatar",
      "password",
      "major"
    );

    await User.update(
      {
        _id: req.user._id
      },
      {
        $set: userData
      }
    );

    if (userData.password) {
      let user = await User.findOne({ _id: req.user._id })
      user.password = userData.password
      await user.save()
    }

    return res.status(200).end();

  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

/**
 * @api {delete} /users/:id Delete User
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 Deleted (No Content)
 * @apiErrorExample {json} User id cannot be empty
 *    HTTP/1.1 400 Not Found
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function remove(req, res) {
  try {
    if (!req.params.id) return res.status(400).end();
    else if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      await User.remove({
        _id: req.params.id
      });

      return res.status(204).end();
    } else {
      return res.status(400).json({
        error: "Id is not valid!"
      });
    }
  } catch (error) {
    return res.status(500).end();
  }
}
