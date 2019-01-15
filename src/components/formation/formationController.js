import _ from "lodash";
import Formation from "./formation";

export async function create(req, res) {
  try { 
    console.log(req.body);
    
    if (!req.body.name)
      return res.status(400).json({
        code: 126,
        error: "name is required !"
      }); 

    if (!req.body.description)
      return res.status(400).json({
        code: 126,
        error: "description is required !"
      }); 

    let formation = _.pick(req.body, "name", "description");

    formation = await Formation.create(formation);

    return res.json(formation);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function getAll(req, res) {
  try {
    let formations = await Formation.find();

    return res.json(formations);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        code: 126,
        error: "id cannot be empty"
      });

    let formation = await Formation.findById({
      _id: req.params.id
    });

    return res.json(formation);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function update(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        code: 126,
        error: "name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        code: 126,
        error: "description is required !"
      });

    let formation = await Formation.findOne({ _id: req.params.id });
    if (!formation)
      return res.status(400).json({
        code: 126,
        error: "formation not found !"
      });

    formation.description = req.body.description;
    formation.name = req.body.name;

    await formation.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function remove(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        code: 126,
        error: "id cannot be empty"
      });
    let formation = await Formation.deleteOne(
      {
        _id: req.params.id
      }
    );

    return res.json(formation);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
