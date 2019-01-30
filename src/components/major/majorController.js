import _ from "lodash";
import { Major, Level, Formation, Section, Subject } from "../../config/models";

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
    await Formation.findOne(
      {
        name: req.body.formation
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.formation = found._id;
        }
      }
    );
    await Level.findOne(
      {
        name: req.body.level
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.level = found._id;
        }
      }
    );
    await Section.findOne(
      {
        name: req.body.section
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          major.section = found._id;
        }
      }
    );
    major = await Major.create(major);
    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
export async function getAll(req, res) {
  try {
    const majors = await Major.find()
      .populate("subjects")
      .exec();

      console.log(majors)

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
        error: "Major ID cannot be empty"
      });

    const major = await Major.findById({
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
        error: "Major name is required !"
      });

    if (!req.body.description)
      return res.status(400).json({
        error: "Major description is required !"
      });

    if (!req.body.formation)
      return res.status(400).json({
        error: "Formation is required !"
      });

    if (!req.body.level)
      return res.status(400).json({
        error: "Level is required !"
      });

    if (!req.body.Section)
      return res.status(400).json({
        error: "Section is required !"
      });

    const NewMajor = _.pick(req.body, "name", "description");
    await Formation.findOne(
      {
        name: req.body.formation
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          NewMajor.formation = found._id;
        }
      }
    );
    await Level.findOne(
      {
        name: req.body.level
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          NewMajor.level = found._id;
        }
      }
    );
    await Section.findOne(
      {
        name: req.body.section
      },
      (err, found) => {
        if (err) {
          return res.status(400).end();
        } else {
          NewMajor.section = found._id;
        }
      }
    );

    let major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(400).json({
        error: "Major not found !"
      });

    major.description = NewMajor.description;
    major.name = NewMajor.name;
    major.formation = NewMajor.formation;
    major.level = NewMajor.level;
    major.section = NewMajor.section;

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
        error: "Major id cannot be empty"
      });
    const major = await Major.deleteOne({
      _id: req.params.id
    });

    return res.json(major);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function addSubjects(req, res) {
  try {
    const major = await Major.findOne({
      _id: req.params.id
    });
    if (!major)
      return res.status(400).json({
        error: "major not found !"
      });

    if (!req.body.subject)
      return res.status(400).json({
        error: "Subject is required !"
      });

    const subject = await Subject.findOne({
      name: req.body.SubjectName
    });

    if (!subject)
      return res.status(500).json({
        error: "subject not found !"
      });

    await major.subjects.push(subject._id);

    await major.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
