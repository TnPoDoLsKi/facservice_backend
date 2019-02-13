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
      approved: true,
      filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[0]._id,
      year: '2018',
      semestre: '1',
      profName: 'Maher Milli',
      session: 'Principale',
      description: 'ds analyse 2018 par Maher Mili'
      // corrections: [this.corrections[0]]
    }, {
      title: 'EX Algo 2017',
      type: 'EX',
      approved: true,
      filePath: 'http://igc.tn:3005/uploads/upload_c16292398cd0d05b1fec792724cf2f17.png',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[1]._id,
      year: '2017',
      semestre: '1',
      profName: 'Hanen Beji',
      session: 'Principale',
      description: 'EX Algo 2017 par Hanen Beji'
    }, {
      title: 'DS Archi 2015',
      type: 'DS',
      approved: true,
      filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
      user: this.user._id,
      major: this.major._id,
      subject: this.subject[2]._id,
      year: '2015',
      semestre: '2',
      profName: 'Heni Mouredi',
      session: 'Principale',
      description: 'DS Archi 2015 par Heni Mouredi'
      // corrections: [this.corrections[1]]
    }]
  }
}

export default DocumentsSeeder
