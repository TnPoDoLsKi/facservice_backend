import _ from "lodash";
import { Version } from "../../config/models";

/**
 * @api {get} /versions Get all versions
 * @apiGroup Versions
 * @apiSuccessExample {json} Success
 [
    {
        "forceUpdate": false,
        "deleted": false,
        "_id": "5c9968198e2b6e302844a578",
        "version": "0.1.2",
        "title": "beta 2",
        "description": "optimize perfermance "
    },
    {
        "forceUpdate": true,
        "deleted": false,
        "_id": "5c9968058e2b6e302844a577",
        "version": "0.1.1",
        "title": "beta",
        "description": "fix security issues "
    },
    {
        "forceUpdate": false,
        "deleted": false,
        "_id": "5c9967c68e2b6e302844a576",
        "version": "0.1",
        "title": "alpha",
        "description": "init version"
    }
]

 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const versions = await Version.find().sort({ createdAt: -1 })

    return res.json(versions);
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

export async function getLast(req, res) {
  try {
    const version = await Version.find().sort({ createdAt: -1 }).limit(1)

    return res.json(version[0]);
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

/**
 * @api {get} /version/:clientVersion Get version update
 * @apiGroup Versions
 * @apiParam {id} clientVersion Client Version
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 {
    "newUpdate": true,
    "version": {
        "forceUpdate": true,
        "description": "fix security issues \noptimize perfermance \n",
        "version": "0.1.2",
        "title": "beta 2"
    }
}
 * @apiErrorExample {json} Name param cannot be empty
 *    HTTP/1.1 400 Bad Request
 *    wrong client version
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getFromVersion(req, res) {
  try {
    const clientVersion = await Version.findOne({ version: req.params.clientVersion })

    if (!clientVersion)
      return res.status(400).json({ error: 'wrong client version' });

    const differenceVersions = await Version.find({ createdAt: { $gt: clientVersion.createdAt } })

    if (differenceVersions.length > 0) {

      let compinedVersion = { forceUpdate: false, description: '' }

      for (let version of differenceVersions) {
        compinedVersion.version = version.version
        compinedVersion.title = version.title
        compinedVersion.description += (version.description + '\n')
        if (version.forceUpdate)
          compinedVersion.forceUpdate = true
      }

      return res.json({ newUpdate: true, version: compinedVersion });
    } else {
      return res.json({ newUpdate: false });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

export async function create(req, res) {
  try {
    const version = await Version.create(req.body)

    return res.json(version);
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {

    await Version.update({ _id: req.params.id }, { $set: req.body })

    return res.status(200).end();
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {

    await Version.delete({ _id: req.params.id }, req.user._id)

    return res.status(200).end();
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}
