import { User } from "../../config/models";
import _ from "lodash";

export async function getByType(req, res) {
  try {
    if (
      !req.params.type ||
      (req.params.type !== "prof" && req.params.type !== "student")
    ) {
      return res.status(400).end();
    }

    let users = await User.find({ type: req.params.type })
      .populate("major")
      .exec();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).end();
  }
}

export async function getAll(req, res) {
  try {
    let users = await User.find()
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

    let user = _.pick(
      req.body,
      "email",
      "hashedPassword",
      "type",
      "firstName",
      "lastName",
      "avatar"
    );

    await User.findOne({ email: user.email }, (err, user) => {
      if (err) {
        return res.status(500).end();
      } else if (!user) {
        return res.status(400).end();
      }
    });

    await User.update({ _id: req.params.id }, { $set: user });

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {
    if (!req.params.id) return res.status(400).end();

    await User.remove({ _id: req.params.id });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
}
