import { Seeder } from 'mongoose-data-seed'
import { User, Document, Correction } from '../src/config/models'

class CorrectionsSeeder extends Seeder {

  async beforeRun() {
    this.users = await User.find().exec()
    this.documents = await Document.find().exec()

    this.corrections = this._generate()
  }

  async shouldRun() {
    return Correction.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Correction.create(this.corrections)
  }

  _generate() {
    return [

      // for document 1 ds math discrètes
      {
        title: 'Correction DS math discrètes 2018',
        description: 'Correction DS math discrètes 2018',
        filePath: 'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf',
        filesStaging: [],
        status: 'approved',
        verifiedByProf: false,
        score: 0,
        user: this.users[0]._id,
        document: this.documents[0]._id
      },

      // for document 2 ex math discrètes
      {
        title: 'Correction EX math discrètes 2018',
        description: 'Correction EX math discrètes 2018',
        filePath: 'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf',
        filesStaging: [],
        status: 'approved',
        verifiedByProf: true,
        score: 0,
        user: this.users[0]._id,
        document: this.documents[1]._id
      },

      // for document 3 ds Probabilité et Statistiques
      {
        title: 'Correction DS Probabilité 2018',
        description: 'Correction DS Probabilité 2018',
        filePath: 'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf',
        filesStaging: [],
        status: 'approved',
        verifiedByProf: true,
        score: 0,
        user: this.users[1]._id,
        document: this.documents[3]._id
      },
      {
        title: 'Correction DS Proba 2018',
        description: 'Correction DS Proba 2018',
        filePath: 'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf',
        filesStaging: [],
        status: 'approved',
        verifiedByProf: false,
        score: 0,
        user: this.users[1]._id,
        document: this.documents[3]._id
      },
      {
        title: 'Correction DS Pes 2018',
        description: 'Correction DS Pes 2018',
        filePath: 'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf',
        filesStaging: [],
        status: 'approved',
        verifiedByProf: false,
        score: 0,
        user: this.users[1]._id,
        document: this.documents[3]._id
      }

    ]
  }
}

export default CorrectionsSeeder
