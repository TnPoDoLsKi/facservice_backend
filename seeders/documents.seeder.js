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
        filePath: 'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf',
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
        filePath: 'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf',
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
        filePath: 'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf',
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
        filePath: 'https://api.facservice.tn/uploads/upload_96c3b1afe677b5c59b42ce9d2ad220b6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: true
      },
      {
        title: 'Ex Probabilité et Statistiques 2017',
        description: 'Ex Probabilité et Statistiques par Hanen Beji',
        type: 'EX',
        status: "pending",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          "https://api.facservice.tn/uploads/upload_4db4d53b9a65093b925e4e1789885b66.png",
          "https://api.facservice.tn/uploads/upload_1da68e6922185c545c3a4010bf5ba455.png",
          "https://api.facservice.tn/uploads/upload_bae69eb95b5951e59d6633393f9e4357.png",
          "https://api.facservice.tn/uploads/upload_14692d23d50fd859b6ba66dc7b6ddf41.jpg"
        ],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: false
      },
      {
        title: 'Cour Probabilité et Statistiques 2019',
        description: 'Cour Probabilité et Statistiques par Maher Milli',
        type: 'C',
        status: "pending",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          "https://api.facservice.tn/uploads/upload_4db4d53b9a65093b925e4e1789885b66.png",
          "https://api.facservice.tn/uploads/upload_1da68e6922185c545c3a4010bf5ba455.png",
          "https://api.facservice.tn/uploads/upload_bae69eb95b5951e59d6633393f9e4357.png",
          "https://api.facservice.tn/uploads/upload_14692d23d50fd859b6ba66dc7b6ddf41.jpg"
        ],
        user: this.users[2]._id,
        subject: this.subjects[1]._id,
        hasCorrection: false
      },

      // for Transmission de données [6..8]
      {
        title: 'DS Transmission de données 2018',
        description: 'DS Transmission de données 2018 par Maher Milli',
        type: 'DS',
        status: "pending",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          'https://api.facservice.tn/uploads/upload_96c3b1afe677b5c59b42ce9d2ad220b6.pdf',
          'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf'
        ],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },
      {
        title: 'Ex Transmission de données 2017',
        description: 'Ex Transmission de données par Hanen Beji',
        type: 'EX',
        status: "pending",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          'https://api.facservice.tn/uploads/upload_96c3b1afe677b5c59b42ce9d2ad220b6.pdf',
          'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf'
        ],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },
      {
        title: 'Cour Transmission de données 2019',
        description: 'Cour Transmission de données par Maher Milli',
        type: 'C',
        status: "pending",
        year: '2019',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          'https://api.facservice.tn/uploads/upload_96c3b1afe677b5c59b42ce9d2ad220b6.pdf',
          'https://api.facservice.tn/uploads/upload_1a2f5db8e53807dc185229166e499bb9.pdf',
          'https://api.facservice.tn/uploads/upload_3679b901e027f7a11658750486b83534.pdf'
        ],
        user: this.users[2]._id,
        subject: this.subjects[2]._id,
        hasCorrection: false
      },

      // for Paradigmes de programmation [9..11]
      {
        title: 'DS Paradigmes de programmation 2018',
        description: 'DS Paradigmes de programmation 2018 par Maher Milli',
        type: 'DS',
        status: "pending",
        year: '2018',
        profName: 'Maher Milli',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          "https://api.facservice.tn/uploads/upload_4db4d53b9a65093b925e4e1789885b66.png",
          "https://api.facservice.tn/uploads/upload_1da68e6922185c545c3a4010bf5ba455.png",
          "https://api.facservice.tn/uploads/upload_bae69eb95b5951e59d6633393f9e4357.png",
          "https://api.facservice.tn/uploads/upload_14692d23d50fd859b6ba66dc7b6ddf41.jpg"
        ],
        user: this.users[2]._id,
        subject: this.subjects[3]._id,
        hasCorrection: false
      },
      {
        title: 'Ex Paradigmes de programmation 2017',
        description: 'Ex Paradigmes de programmation par Hanen Beji',
        type: 'EX',
        status: "pending",
        year: '2017',
        profName: 'Hanen Beji',
        session: 'Principale',
        filePath: '',
        filesStaging: [
          "https://api.facservice.tn/uploads/upload_4db4d53b9a65093b925e4e1789885b66.png",
          "https://api.facservice.tn/uploads/upload_1da68e6922185c545c3a4010bf5ba455.png",
          "https://api.facservice.tn/uploads/upload_bae69eb95b5951e59d6633393f9e4357.png",
          "https://api.facservice.tn/uploads/upload_14692d23d50fd859b6ba66dc7b6ddf41.jpg"
        ],
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
        filePath: 'https://api.facservice.tn/uploads/upload_96c3b1afe677b5c59b42ce9d2ad220b6.pdf',
        filesStaging: [],
        user: this.users[2]._id,
        subject: this.subjects[3]._id,
        hasCorrection: false
      }

    ]
  }
}

export default DocumentsSeeder
