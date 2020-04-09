import { Seeder } from 'mongoose-data-seed'
import { User, Subject, Document } from '../src/config/models'

class DocumentsSeeder extends Seeder {

  async beforeRun() {
    this.users = await User.find().exec()
    this.subjects = await Subject.find().exec()

    this.documents = this._generate()
  }

  async shouldRun() {
    return Document.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Document.create(this.documents)
  }

  _generate() {
    return [

      // for Mathématiques discrètes [0..2]
      {
        title: 'DS math discrètes 2018',
        description: 'DS math discrètes 2018 par Maher Milli',
        type: 'DS',
        status: "approved",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[0]._id,
        subject: this.subjects[0]._id,
        hasCorrection: true
      },
      {
        title: 'Ex math discrètes 2017',
        description: 'Ex math discrètes par Hanen Beji',
        type: 'EX',
        status: "approved",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[1]._id,
        subject: this.subjects[0]._id,
        hasCorrection: true
      },
      {
        title: 'Cour math discrètes 2019',
        description: 'Cour math discrètes par Maher Milli',
        type: 'C',
        status: "approved",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[1]._id,
        subject: this.subjects[0]._id,
        hasCorrection: false
      },

      // for Probabilité et Statistiques [3..5]
      {
        title: 'DS Probabilité et Statistiques 2018',
        description: 'DS Probabilité et Statistiques 2018 par Maher Milli',
        type: 'DS',
        status: "approved",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: true
      },
      {
        title: 'Ex Probabilité et Statistiques 2017',
        description: 'Ex Probabilité et Statistiques par Hanen Beji',
        type: 'EX',
        status: "approved",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: false
      },
      {
        title: 'Cour Probabilité et Statistiques 2019',
        description: 'Cour Probabilité et Statistiques par Maher Milli',
        type: 'C',
        status: "approved",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: false
      },

      // for Transmission de données [6..8]
      {
        title: 'DS Transmission de données 2018',
        description: 'DS Transmission de données 2018 par Maher Milli',
        type: 'DS',
        status: "approved",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },
      {
        title: 'Ex Transmission de données 2017',
        description: 'Ex Transmission de données par Hanen Beji',
        type: 'EX',
        status: "approved",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },
      {
        title: 'Cour Transmission de données 2019',
        description: 'Cour Transmission de données par Maher Milli',
        type: 'C',
        status: "approved",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },

      // for Paradigmes de programmation [9..11]
      {
        title: 'DS Paradigmes de programmation 2018',
        description: 'DS Paradigmes de programmation 2018 par Maher Milli',
        type: 'DS',
        status: "approved",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[3]._id,
        hasCorrection: false
      },
      {
        title: 'Ex Paradigmes de programmation 2017',
        description: 'Ex Paradigmes de programmation par Hanen Beji',
        type: 'EX',
        status: "approved",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[3]._id,
        hasCorrection: false
      },
      {
        title: 'Cour Paradigmes de programmation 2019',
        description: 'Cour Paradigmes de programmation par Maher Milli',
        type: 'C',
        status: "approved",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: 'http://igc.tn:3005/uploads/upload_ab8e33735866a91c21e582e8fbefe6a6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[3]._id,
        hasCorrection: false
      }

    ]
  }
}

export default DocumentsSeeder
