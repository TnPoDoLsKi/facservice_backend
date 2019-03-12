import _ from "lodash";
import { User, Major } from "../../config/models";


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

    const users = await User.find({
      type: req.params.type
    })
      .select("-hashedPassword")
      .populate("major")
      .exec();

    return res.json(users);
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

    return res.json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {get} /user Get current user
 * @apiGroup Users
 * @apiHeader Authorization Bearer Token
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
        "_id": "5c2426542a7e2f361896f812",
        "firstName": "mohamed",
        "lastName": "mohamed",
        "email": "mohamed@test.com",
        "major": "5c2426542a7e2f361896f812"
    }
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getCurrent(req, res) {
  try {
    const user = _.pick(req.user, "firstName", "lastName", "email", "major");
    return res.json(user);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {put} /user Update user info
 * @apiGroup Users
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

    if (req.body.email && req.body.email != req.user.email) {

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailRegex.test(req.body.email))
        return res.status(400).json({ error: 'Wrong email form' })

      const existingUser = await User.findOne({ email: req.body.email })

      if (existingUser)
        return res.status(400).json({ error: 'email already exist' })

      req.user.email = req.body.email
    }

    if (req.body.password) {
      if (!req.body.oldPassword)
        return res.status(400).json({ error: 'old password is required' })

      if (!req.user.comparePassword(req.body.oldPassword))
        return res.status(400).json({ error: 'Wrong old password' })

      if (req.body.password.length < 8)
        return res.status(400).json({ error: 'Password should contain eight characters or more' })

      req.user.password = req.body.password
    }

    if (req.body.type) {
      if (['admin', 'professor', 'student'].indexOf(req.body.type) < 0)
        return res.status(400).json({ error: 'wrong user type' })

      req.user.type = req.body.type
    }

    if (req.body.firstName)
      req.user.firstName = req.body.firstName

    if (req.body.lastName)
      req.user.lastName = req.body.lastName

    if (req.body.avatar)
      req.user.avatar = req.body.avatar

    if (req.body.major) {
      const major = await Major.findOne({ _id: req.body.major })

      if (!major)
        return res.status(400).json({ error: 'wrong major id' })

      req.user.major = req.body.major
    }

    await req.user.save()

    return res.status(200).end();

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

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

    await User.delete({ _id: req.params.id }, req.user._id);

    return res.status(204).end();

  } catch (error) {
    console.log(error)
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}
