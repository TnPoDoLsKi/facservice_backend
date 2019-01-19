import { Seeder } from 'mongoose-data-seed'
import {
  Subject
} from '../src/config/models'

const data = [{
  name: 'Mathématiques discrètes',
  semestre: 1
},
{
  name: 'Probabilité et Statistiques',
  semestre: 1
},
{
  name: 'Transmission de données',
  semestre: 1
},
{
  name: 'Paradigmes de programmation',
  semestre: 1
},
{
  name: 'Algorithmique et structures de données',
  semestre: 1
}, {
  name: 'Bases de données',
  semestre: 1
}, {
  name: 'Architectures des ordinateurs',
  semestre: 1
}, {
  name: "Fondements des systèmes d'exploitation",
  semestre: 1
}, {
  name: "Création d'entreprises et innovation",
  semestre: 1
}, {
  name: "Mathématiques pour l'Ingénieur",
  semestre: 2
}, {
  name: 'Graphes et Recherche Opérationnelle',
  semestre: 2
}, {
  name: 'Internet et Protocoles',
  semestre: 2
}, {
  name: 'Réseaux Informatiques',
  semestre: 2
}, {
  name: "Systèmes d'exploitation embarqués et temps réel",
  semestre: 2
}, {
  name: 'Théorie des Langages et Compilation',
  semestre: 2
}, {
  name: "Méthodologies d'analyse et de conception de logiciels(MOO, Design patterns, …)",
  semestre: 2
}, {
  name: 'Programmation OO (IG, Threads, RMI, Socket, …)',
  semestre: 2
}, {
  name: 'Comptabilité générale',
  semestre: 2
}, {
  name: "Théorie des files d'attente",
  semestre: 1
}, {
  name: 'Analyse Numérique',
  semestre: 1
}, {
  name: 'SGBD et administration',
  semestre: 1
}, {
  name: 'Programmation Web',
  semestre: 1
}, {
  name: 'Administration des réseaux',
  semestre: 1
}, {
  name: 'Sécurité des réseaux',
  semestre: 1
}, {
  name: 'Traitement de signal',
  semestre: 1
}, {
  name: 'Electronique analogique',
  semestre: 1
}, {
  name: 'Electronique numérique',
  semestre: 1
}, {
  name: 'Automatique et commande',
  semestre: 1
}, {
  name: 'Comptabilité analytique',
  semestre: 1
}, {
  name: 'Architectures logicielles (multi‐tiers, SOA,…) et principes de conception',
  semestre: 2
}, {
  name: "Sécurité des logiciels et des systèmes d'information",
  semestre: 2
}, {
  name: 'Outils et ateliers avancés de génie logiciel',
  semestre: 2
}, {
  name: 'Mini Projet',
  semestre: 2
}, {
  name: 'VHDL et Circuits Programmables',
  semestre: 2
}, {
  name: 'Architectures des systèmes  T.R.',
  semestre: 2
}, {
  name: 'Automatisme et supervision',
  semestre: 2
}, {
  name: 'Commande numérique',
  semestre: 2
}, {
  name: 'Microprocesseurs',
  semestre: 2
}, {
  name: 'Interfaces et Communications',
  semestre: 2
}, {
  name: 'C.A.O en électronique',
  semestre: 2
}, {
  name: 'Qualité, Audit, Gestion de projets (PMP)',
  semestre: 2
}, {
  name: 'Réseaux Industriels',
  semestre: 1
}, {
  name: 'Sécurité industrielle',
  semestre: 1
}, {
  name: 'Intelligence Artificielle',
  semestre: 1
}, {
  name: 'Eléments  de Mécatronique‐Robotique',
  semestre: 1
}, {
  name: 'Veille technologique',
  semestre: 1
}, {
  name: 'Environnements de développement (.net, J2EE,…)',
  semestre: 1
}, {
  name: 'Systèmes embarqués',
  semestre: 1
}, {
  name: 'Sûreté  de fonctionnement',
  semestre: 1
}, {
  name: 'Systèmes mobiles et développement de code mobile et embarqué',
  semestre: 1
}, {
  name: 'Marketing Industriel',
  semestre: 1
}]

class SubjectsSeeder extends Seeder {
  async shouldRun () {
    return Subject.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Subject.create(data)
  }
}

export default SubjectsSeeder
