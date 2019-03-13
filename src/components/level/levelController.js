import _ from "lodash";
import { Level, Formation } from "../../config/models";


export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.formation)
      return res.status(400).json({
        error: "formation is required !"
      });

    const formation = await Formation.findOne({ _id: req.body.formation });

    if (!formation)
      return res.status(400).json({
        error: "wrong formation id !"
      });

    const level = await Level.create(req.body);

    return res.json(level);
    
  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}

/**
 * @api {get} /levels Get all levels
 * @apiGroup Levels
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
  [
    {
        "deleted": false,
        "_id": "5c826194157314398aa8c05e",
        "description": "level description",
        "name": "2er",
        "formation": "5c8263677c8e2f4013c6986f",
        "createdAt": "2019-03-08T12:35:32.637Z",
        "updatedAt": "2019-03-08T12:44:37.914Z",
        "__v": 0
    },
    {
        "deleted": false,
        "_id": "5c8267d27c8e2f4013c69a27",
        "description": "level description",
        "name": "1er",
        "formation": "5c8263677c8e2f4013c6986f",
        "createdAt": "2019-03-08T12:35:32.637Z",
        "updatedAt": "2019-03-08T12:44:37.914Z",
        "__v": 0
    }
  ]
 * @apiErrorExample Internal Server Error
 *    HTTP/1.1 500 Internal Server Error
 */

export async function getAll(req, res) {
  try {
    const levels = await Level.find();

    return res.json(levels);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

 export async function getOne(req, res) {
  try {

    const level = await Level.findById({
      _id: req.params.id
    });

    return res.json(level);

  } catch (error) {

    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })
    return res.status(500).end();
  }
}

 export async function update(req, res) {
  try {

    let level = await Level.findOne({ _id: req.params.id });
    if (!level)
      return res.status(401).json({
        error: "level not found !"
      });

    if (req.body.name)
      level.name = req.body.name;

    if (req.body.description)
      level.description = req.body.description;

    if (req.body.formation) {
      const formation = await Formation.findOne({ _id: req.body.formation });

      if (!formation)
        return res.status(400).json({
          error: "wrong formation id "
        });

      level.formation = req.body.formation;
    }

    await level.save();

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

    await Level.delete({ _id: req.params.id }, req.user._id);

    return res.status(200).end();

  } catch (error) {
    console.log(error);
    if (error.name == 'CastError')
      return res.status(400).json({ error: error.message })

    return res.status(500).end();
  }
}
