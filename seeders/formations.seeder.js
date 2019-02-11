import {
  Seeder
} from 'mongoose-data-seed'
import {
  Formation
} from '../src/config/models'

const data = [{
  name: 'FI',
  description: "Fomation d'Ingénieur"
},
{
  name: 'Prepa',
  description: 'Préparatoire'
},
{
  name: 'LaII',
  description: 'Licence Appliquée en Informatique Industrielle'
},
{
  name: 'LaGm',
  description: 'Licence Appliquée en Génie Mécanique'
},
{
  name: 'LaEEA',
  description: 'Licence Appliquée en Electronique, Electrotechnique et Automatique'
},
{
  name: 'LaEng',
  description: 'Licence Appliquée en Energétique'
},
{
  name: 'LaGc',
  description: 'Licence Appliquée en Génie Civil'
},
{
  name: 'LaEm',
  description: 'Licence Appliquée en Electromécanique'
},
{
  name: 'LFSI',
  description: "Licence Fondamentale en Sciences de l'informatique"
},
{
  name: 'LFEEA',
  description: 'Licence Fondamentale en Electronique, Electrotechnique et Automatique'
},
{
  name: 'LFGM',
  description: 'Licence Fondamentale en Génie Mécanique'
},
{
  name: 'MP-GM',
  description: 'Master Professionnel en GM: Génie de Procédés de Production Mécanique (GPPM)'
},
{
  name: 'MR-MSEE',
  description: 'Master de Recherche en EEA: Microsystèmes et Systèmes Electroniques Embarqués'
},
{
  name: 'MR-INFO',
  description: 'Master de Recherche en Informatique: Systèmes Pervasifs Intelligents'
},
{
  name: 'MP-ENG',
  description: 'Master Professionnel en ENG: Maitrise et Exploitation Rationnelle de l’énergie'
},
{
  name: 'MP-EEB',
  description: 'Master Professionnel en ENG: Efficacité Energétique dans les Bâtiments'
},
{
  name: 'MR-GM',
  description: 'Master Recherche en GM'
}
]

class FormationsSeeder extends Seeder {
  async shouldRun () {
    return Formation.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Formation.create(data)
  }
}

export default FormationsSeeder
