import {
  Seeder
} from 'mongoose-data-seed'
import { Document, User, Correction } from '../src/config/models'

class CorrectionsSeeder extends Seeder {
  async beforeRun () {
    this.user = await User.findOne({
      email: 'chady@gmail.com' }
    ).exec()
    this.documents = await Document.find().exec()
    this.corrections = this._generateCorrections()
  }
  async shouldRun () {
    return Correction.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Correction.create(this.corrections)
  }

  _generateCorrections () {
    return [{
      title: 'correction ds algo 2015',
      filePath: '/uploads/jdhgfhd.jpg',
      user: this.user._id,
      document: this.documents[0]._id
    }, {
      title: 'correction ds analyse 2018',
      filePath: '/uploads/jdhgfhd.jpg',
      user: this.user._id,
      document: this.documents[1]._id
    }]
  }
}

export default CorrectionsSeeder
