import { Seeder } from 'mongoose-data-seed'
import { Level, Major } from '../src/config/models'

class MajorsSeeder extends Seeder {

  async beforeRun() {
    this.levels = await Level.find().exec()
    this.majors = this._generate()
  }

  async shouldRun() {
    return Major.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Major.create(this.majors)
  }

  _generate() {
    return [
      {
        name: 'Prepa A1',
        level: this.levels[0]._id,
      },
      {
        name: 'Prepa A2',
        level: this.levels[1]._id,
      },

      // Ingénieur 
      {
        name: 'FIA 1',
        level: this.levels[2]._id,
      },
      {
        name: 'FIA 2 GL',          // -----------------------------> We will continue with this 
        level: this.levels[3]._id,
      },
      {
        name: 'FIA 2 II',          // -----------------------------> and this one also 
        level: this.levels[3]._id,
      },
      {
        name: 'FIA 3 GL',
        level: this.levels[4]._id,
      },
      {
        name: 'FIA 3 II',
        level: this.levels[4]._id,
      }
    ]
  }
}

export default MajorsSeeder
