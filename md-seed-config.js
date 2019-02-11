import mongooseLib from 'mongoose'
import { DB } from './src/config/env'
import FormationsSeeder from './seeders/formations.seeder'
import LevelsSeeder from './seeders/levels.seeder'
import SectionsSeeder from './seeders/sections.seeder'
import SubjectsSeeder from './seeders/subjects.seeder'
import MajorsSeeder from './seeders/majors.seeder'
import UsersSeeder from './seeders/users.seeder'
import DocumentsSeeder from './seeders/documents.seeder'
import CorrectionsSeeder from './seeders/corrections.seeder'

mongooseLib.Promise = global.Promise

// Export the mongoose lib
export const mongoose = mongooseLib

// Export the mongodb url
export const mongoURL = DB

console.log(process.env.MONGODB_URI )

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
  Levels: LevelsSeeder,
  Sections: SectionsSeeder,
  Formations: FormationsSeeder,
  Subjects: SubjectsSeeder,
  Majors: MajorsSeeder,
  Users: UsersSeeder,
  CorrectionsSeeder,
  DocumentsSeeder
}
