import { User, Major } from "../../config/models";
import _ from "lodash";
import bcrypt from "bcrypt";

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

export async function update(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).end();
    }

    const user = _.pick(
      req.body,
      "email",
      "hashedPassword",
      "type",
      "firstName",
      "lastName",
      "avatar"
    );

    if (req.body.major) {
      await Major.findOne(
        {
          desc: req.body.major
        },
        (err, foundMajor) => {
          if (err) {
            return res.status(400).end();
          } else {
            user.major = foundMajor._id;
          }
        }
      );
    }

    if (user.hashedPassword) {
      const salt = bcrypt.genSaltSync(10);
      user.hashedPassword = bcrypt.hashSync(user.hashedPassword, salt);
    }

    await User.update({ _id: req.params.id }, { $set: user });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {
    if (!req.params.id) return res.status(400).end();

    await User.remove({
      _id: req.params.id
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
}
