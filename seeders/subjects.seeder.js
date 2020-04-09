import { Seeder } from 'mongoose-data-seed'
import { Major, Subject } from '../src/config/models'

class SubjectsSeeder extends Seeder {

  async beforeRun() {
    this.majors = await Major.find().exec()
    this.subjects = this._generate()
  }

  async shouldRun() {
    return Subject.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Subject.create(this.subjects)
  }

  _generate() {
    return [

      // major 3 => FIA 2 GL 
      // major 4 => FIA 2 II 

      {
        name: 'Mathématiques discrètes',         // ----------------> We will use this subject as main sub
        semestre: 1,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Probabilité et Statistiques',     // ----------------> and this one
        semestre: 1,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Transmission de données',         // ----------------> and this one
        semestre: 1,
        majors: [this.majors[4]]
      },
      {
        name: 'Paradigmes de programmation',     // ----------------> and this one
        semestre: 1,
        majors: [this.majors[3]]
      },
      {
        name: 'Algorithmique et structures de données',
        semestre: 1,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Bases de données',
        semestre: 1,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Architectures des ordinateurs',
        semestre: 1,
        majors: [this.majors[4]]
      },
      {
        name: "Mathématiques pour l'Ingénieur",
        semestre: 2,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Graphes et Recherche Opérationnelle',
        semestre: 2,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Internet et Protocoles',
        semestre: 2,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: 'Réseaux Informatiques',
        semestre: 2,
        majors: [this.majors[3], this.majors[4]]
      },
      {
        name: "Systèmes d'exploitation embarqués et temps réel",
        semestre: 2,
        majors: [this.majors[4]]
      }
    ]
  }
}

export default SubjectsSeeder
