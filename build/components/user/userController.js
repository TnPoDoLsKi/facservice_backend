"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByType = getByType;
exports.getAll = getAll;
exports.getCurrent = getCurrent;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getByType(req, res) {
  try {
    var users = await _models.User.find({
      type: req.params.type
    }).select("-hashedPassword").populate("major").exec();

    return res.json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

async function getAll(req, res) {
  try {
    var users = await _models.User.find().select("-hashedPassword").populate("major").exec();

    return res.json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {get} /user Get current user
 * @apiGroup Users
 * @apiHeader Authorization Bearer Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
          "firstName": "Wael",
          "lastName": "Ben Taleb",
          "email": "waelben7@gmail.com",
          "major": "5c8265367e19d73dba8355a6",
          "_id": "5c8783b34a35cd28fa5bea3b"
      }
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function getCurrent(req, res) {
  try {
    var user = _lodash2.default.pick(req.user, "firstName", "lastName", "email", "major", "_id");
    return res.json(user);
  } catch (err) {
    return res.status(500).end();
  }
}

/**
 * @api {put} /users Update profile
 * @apiGroup Users
 * @apiHeader Authorization Bearer Token
 *
 * @apiParamExample {json} Input
 *    {
 *      "email": "waelben7@gmail.com",
 *      "firstName": "Wael",
 *      "lastName": "Ben Taleb",
 *      "major": "5c8265367e19d73dba8355a6",
 *      "oldPassword": "12345678",
 *      "password": "87654321"
 *    }
 *
 * @apiErrorExample Not Authorized
 *    HTTP/1.1 401 Not Authorized
 * @apiErrorExample Bad Request
 *    HTTP/1.1 400 Bad Request
 *    email already exist
 *    old password is required
 *    Wrong old password
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

async function update(req, res) {
  try {
    if (req.body.email && req.body.email != req.user.email) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(req.body.email)) return res.status(400).json({ error: "Wrong email form" });

      var existingUser = await _models.User.findOne({ email: req.body.email });

      if (existingUser) return res.status(400).json({ error: "email already exist" });

      req.user.email = req.body.email;
    }

    if (req.body.password) {
      if (!req.body.oldPassword) return res.status(400).json({ error: "old password is required" });

      if (!req.user.comparePassword(req.body.oldPassword)) return res.status(400).json({ error: "Wrong old password" });

      if (req.body.password.length < 8) return res.status(400).json({ error: "Password should contain eight characters or more" });

      req.user.password = req.body.password;
    }

    // if (req.body.type) {
    //   if (['admin', 'professor', 'student'].indexOf(req.body.type) < 0)
    //     return res.status(400).json({ error: 'wrong user type' })

    //   req.user.type = req.body.type
    // }

    if (req.body.firstName) req.user.firstName = req.body.firstName;

    if (req.body.lastName) req.user.lastName = req.body.lastName;

    if (req.body.avatar) req.user.avatar = req.body.avatar;

    if (req.body.major) {
      var major = await _models.Major.findOne({ _id: req.body.major });

      if (!major) return res.status(400).json({ error: "wrong major id" });

      req.user.major = req.body.major;
    }

    await req.user.save();

    return res.json({ success: true });
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}

async function remove(req, res) {
  try {
    await _models.User.delete({ _id: req.params.id }, req.user._id);

    return res.status(204).end();
  } catch (error) {
    if (error.name == "CastError") return res.status(400).json({ error: error.message });
    console.log(error);

    return res.status(500).end();
  }
}