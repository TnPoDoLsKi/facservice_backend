import _ from "lodash";
import { Major, Level } from "../../config/models";


export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.level)
      return res.status(400).json({
        error: "level is required !"
      });

    const level = await Level.findOne({ _id: req.body.level });

    if (!level)
      return res.status(400).json({
        error: "wrong level id !"
      });

    const major = await Major.create(req.body);

    return res.json(major);

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {get} /majors Get all majors
 * @apiGroup Majors
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 [
    {
        "deleted": false,
        "_id": "5c82650d1227833d35ac2a29",
        "description": "major description",
        "name": "LFSI 1",
        "level": "5c8267d27c8e2f4013c69a27",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8265367e19d73dba8355a6",
        "name": "Prepa 2",
        "description": "major description",
        "level": "5c826194157314398aa8c05e",
        "__v": 0
    }
]
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const majors = await Major.find()

    return res.json(majors);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function getOne(req, res) {
  try {

    const major = await Major.findById({ _id: req.params.id })

    return res.json(major);

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

export async function getOneByName(req, res) {
  try {

    const major = await Major.findOne({ name: req.params.name })

    return res.json(major);

  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {

    let major = await Major.findOne({ _id: req.params.id });

    if (!major)
      return res.status(401).json({
        error: "Major not found "
      });

    if (req.body.name)
      major.name = req.body.name;

    if (req.body.description)
      major.description = req.body.description;

    if (req.body.level) {
      const level = await Level.findOne({ _id: req.body.level });

      if (!level)
        return res.status(400).json({
          error: "wrong level id !"
        });

      major.level = req.body.level;
    }

    await major.save();
    return res.status(200).end();

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {

    await Major.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}
