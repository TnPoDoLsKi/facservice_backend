import {
  Seeder
} from 'mongoose-data-seed'
import {
  Document,
  User,
  Major,
  Subject,
  Correction
} from '../src/config/models'

class DocumentsSeeder extends Seeder {
  async beforeRun () {
    this.user = await User.findOne({
      email: 'mouna@gmail.com'
    }).exec()
    this.major = await Major.findOne({
      name: 'FIA1'
    }).exec()
    this.subject = await Subject.find().exec()
    this.corrections = await Correction.find().exec()
    this.documents = this._generateDocuments()
  }
  async shouldRun () {
    return Document.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Document.create(this.documents)
  }

  _generateDocuments () {
    return [{
      title: 'ds analyse 2018',
      type: 'DS',
      filePath: '/uploads/jdhgfhd.jpg',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[0]._id,
      year: '2018',
      semestre: '1',
      profName: 'Maher Milli',
      session: 'Principale',
      corrections: [this.corrections[0]]
    }, {
      title: 'EX Algo 2017',
      type: 'EX',
      filePath: '/uploads/jdhgfhd.jpg',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[1]._id,
      year: '2017',
      semestre: '1',
      profName: 'profX',
      session: 'Principale'
    }, {
      title: 'DS Archi 2015',
      type: 'DS',
      filePath: '/uploads/jdhgfhd.jpg',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[2]._id,
      year: '2015',
      semestre: '2',
      profName: 'profX',
      session: 'Principale',
      corrections: [this.corrections[1]]
    }]
  }
}

export default DocumentsSeeder
