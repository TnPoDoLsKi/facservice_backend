"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.getLast = getLast;
exports.getFromVersion = getFromVersion;
exports.create = create;
exports.update = update;
exports.remove = remove;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../../config/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

async function getAll(req, res) {
  try {
    var versions = await _models.Version.find().sort({ createdAt: -1 });

    return res.json(versions);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function getLast(req, res) {
  try {
    var version = await _models.Version.findOne({}, {}, { sort: { 'createdAt': -1 } });

    return res.json(version);
  } catch (err) {
    console.log(err);
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

async function getFromVersion(req, res) {
  try {
    return res.json({ newUpdate: false });

    var clientVersion = await _models.Version.findOne({ version: req.params.clientVersion });

    if (!clientVersion) return res.status(400).json({ error: 'wrong client version' });

    var differenceVersions = await _models.Version.find({ createdAt: { $gt: clientVersion.createdAt } });

    if (differenceVersions.length > 0) {

      var compinedVersion = { forceUpdate: false, description: '' };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = differenceVersions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var version = _step.value;

          compinedVersion.version = version.version;
          compinedVersion.title = version.title;
          compinedVersion.description += version.description + '\n';
          if (version.forceUpdate) compinedVersion.forceUpdate = true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return res.json({ newUpdate: true, version: compinedVersion });
    } else {
      return res.json({ newUpdate: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function create(req, res) {
  try {
    var version = await _models.Version.create(req.body);

    return res.json(version);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function update(req, res) {
  try {

    await _models.Version.update({ _id: req.params.id }, { $set: req.body });

    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function remove(req, res) {
  try {

    await _models.Version.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}