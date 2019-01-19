import _ from "lodash";
import { Major, Level, Formation, Section ,Subject } from "../../config/models";

export async function create(req, res) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        error: "name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "description is required !"
      });

    if (!req.body.formation)
      return res.status(400).json({
        error: "formation is required !"
      });

    if (!req.body.level)
      return res.status(400).json({
        error: "level is required !"
      });

    if (!req.body.section)
      return res.status(400).json({
        error: "section is required !"
      });
    let major = _.pick(req.body, "name", "description");
    await Formation.findOne({ name: req.body.formation }, (err, found) => {
      if (err) {
        return res.status(400).end();
      } else {
        major.formation = found._id;
      }
    });
    await Level.findOne({ name: req.body.level }, (err, found) => {
      if (err) {
        return res.status(400).end();
      } else {
        major.level = found._id;
      }
    });
    await Section.findOne({ name: req.body.section }, (err, found) => {
      if (err) {
        return res.status(400).end();
      } else {
        major.section = found._id;
      }
    });
    major = await Major.create(major);
    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function getAll(req, res) {
  try {
    let majors = await Major.find();

    return res.json(majors);
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

    let major = await Major.findById({
      _id: req.params.id
    });

    return res.json(major);
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

    let major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(400).json({
        code: 126,
        error: "major not found !"
      });

    major.description = req.body.description;
    major.name = req.body.name;

    await major.save();

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
    let major = await Major.deleteOne(
      {
        _id: req.params.id
      }
    );

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function addSubjects(req, res) {
  try {
    
    let major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(400).json({
        code: 126,
        error: "major not found !"
      });

      if (!req.body.SubjectName)
      return res.status(400).json({
        error: "SubjectName is required !"
      });

      let subject = await Subject.findOne({
       name: req.body.SubjectName 
      });
      
      if (!subject)
        return res.status(400).json({
          code: 126,
          error: "subject not found !"
        });
      /*console.log(subject._id);*/  /*right ^^ */

      await major.subjects.push(subject);

    await major.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}