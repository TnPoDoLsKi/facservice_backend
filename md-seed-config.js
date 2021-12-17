import mongooseLib from 'mongoose'
import { MONGODB_URI } from './src/config/env'

import FormationsSeeder from './seeders/formations.seeder'
import LevelsSeeder from './seeders/levels.seeder'
import MajorsSeeder from './seeders/majors.seeder'
import UsersSeeder from './seeders/users.seeder'
import SubjectsSeeder from './seeders/subjects.seeder'
import DocumentsSeeder from './seeders/documents.seeder'
import CorrectionsSeeder from './seeders/corrections.seeder'

mongooseLib.Promise = global.Promise

// Export the mongoose lib
export const mongoose = mongooseLib

// Export the mongodb url
export const mongoURL = "mongodb+srv://facservice:facservice@cluster0.fuo82.mongodb.net/facservice?retryWrites=true&w=majority"

// Seeders List - order is important

export const seedersList = {
  FormationsSeeder,
  LevelsSeeder,
  MajorsSeeder,
  UsersSeeder,
  SubjectsSeeder,
  DocumentsSeeder,
  CorrectionsSeeder
}
