import { Seeder } from 'mongoose-data-seed'
import { Section } from '../src/config/models'

const data = [{
  name: 'GL',
  description: 'Génie Logicielle'
}, {
  name: 'II',
  description: 'Informatique Industrielle'
}, {
  name: 'GL-AL',
  description: 'Génie Logiciel: Architecture Logicielle'
}, {
  name: 'EII',
  description: 'Electronique et Informatique Industrielle'
}, {
  name: 'GPPM',
  description: 'Génie de Procédés de Production Mécanique'
}, {
  name: 'Produc',
  description: 'Production'
}]

class SectionsSeeder extends Seeder {
  async shouldRun () {
    return Section.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Section.create(data)
  }
}

export default SectionsSeeder
