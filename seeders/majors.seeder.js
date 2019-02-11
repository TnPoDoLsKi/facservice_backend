import {
  Seeder
} from 'mongoose-data-seed'
import {
  Major,
  Formation,
  Level,
  Section,
  Subject
} from '../src/config/models'

class MajorsSeeder extends Seeder {
  async beforeRun () {
    this.formations = await Formation.find({
      name: { $in: ['FI', 'LaII', 'LaGm', 'LaEng', 'LaEm', 'LFSI'] } }
    ).exec()
    this.levels = await Level.find().exec()
    this.sections = await Section.find({ name: { $in: ['GL', 'II', 'GL-AL'] } }).exec()
    this.subjects = await Subject.find().exec()
    this.majors = this._generateMajors()
  }

  async shouldRun () {
    return Major.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Major.create(this.majors)
  }

  _generateMajors () {
    return [{
      name: 'FIA1',
      description: "1ere année Formation d'Ingénieur",
      formation: this.formations[0]._id,
      level: this.levels[0]._id,
      subjects: [this.subjects[0]._id, this.subjects[1]._id, this.subjects[2]._id, this.subjects[3]._id, this.subjects[4]._id, this.subjects[5]._id, this.subjects[6]._id, this.subjects[7]._id, this.subjects[8]._id]
    }, {
      name: 'FIA2-II',
      description: "2eme année Formation d'Ingénieur: Informatique Industrielle",
      formation: this.formations[0]._id,
      level: this.levels[1]._id,
      subjects: [(this.subjects[18]._id, this.subjects[19]._id, this.subjects[20]._id, this.subjects[21]._id, this.subjects[22]._id, this.subjects[23]._id, this.subjects[24]._id, this.subjects[25]._id)]
    }]
  }
}

export default MajorsSeeder
