import { Seeder } from 'mongoose-data-seed'
import { Formation, Level } from '../src/config/models'

class LevelsSeeder extends Seeder {

  async beforeRun() {
    this.formations = await Formation.find().exec()
    this.levels = this._generate()
  }

  async shouldRun() {
    return Level.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Level.create(this.levels)
  }

  _generate() {
    return [
      // Prepa
      {
        name: '1er année',
        formation: this.formations[0]._id,
      },
      {
        name: '2eme année',
        formation: this.formations[0]._id,
      },

      // Ingénieur 
      {
        name: '1er année',
        formation: this.formations[1]._id,
      },
      {
        name: '2eme année',
        formation: this.formations[1]._id,
      },
      {
        name: '3eme année',
        formation: this.formations[1]._id,
      }
    ]
  }
}

export default LevelsSeeder
