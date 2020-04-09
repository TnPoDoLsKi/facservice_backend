import {
  Seeder
} from 'mongoose-data-seed'
import {
  Formation
} from '../src/config/models'

const data = [
  {
    name: 'Prepa',
    description: 'Préparatoire'
  },
  {
    name: 'Ingénieur',
    description: "Fomation d'Ingénieur"
  },
  {
    name: 'Licence',
    description: 'Licence Appliquée en Informatique Industrielle'
  },
  {
    name: 'Master',
    description: 'Licence Appliquée en Génie Mécanique'
  }
]

class FormationsSeeder extends Seeder {
  async shouldRun() {
    return Formation.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return Formation.create(data)
  }
}

export default FormationsSeeder
