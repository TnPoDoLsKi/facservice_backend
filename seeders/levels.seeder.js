import {
  Seeder
} from 'mongoose-data-seed';
import {
  Level
} from '../src/config/models';

const data = [{
  name: "A1",
  description: "1ere année"
}, {
  name: "A2",
  description: "2eme année"
}, {
  name: "A3",
  description: "3eme année"
}];

class LevelsSeeder extends Seeder {

  async shouldRun() {
    return Level.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Level.create(data);
  }
}

export default LevelsSeeder;