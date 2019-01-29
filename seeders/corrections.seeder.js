import { Seeder } from 'mongoose-data-seed'
import { Model } from '../server/models'

const data = [{

}]

class CorrectionsSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

export default CorrectionsSeeder