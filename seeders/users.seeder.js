import { Seeder } from 'mongoose-data-seed'
import { Major, User } from '../src/config/models'

class UsersSeeder extends Seeder {

  async beforeRun() {
    this.major = await Major.find().exec()
    this.users = this._generate()
  }

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0)
  }

  async run() {
    return User.create(this.users)
  }

  _generate() {
    return [

      // major 3 => FIA 2 GL 
      // major 4 => FIA 2 II 

      // default password is 12345678

      // Students
      {
        email: 'wiemdridi@gmail.com',
        firstName: 'Wiem',
        lastName: 'Dridi',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'student',
        major: this.major[3]._id,
        activated: true
      },
      {
        email: 'lamissmessaoudi@gmail.com',
        firstName: 'Lamiss',
        lastName: 'Messaoudi',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'student',
        major: this.major[3]._id,
        activated: true
      },
      {
        email: 'mouna@gmail.com',
        firstName: 'Mouna',
        lastName: 'Ammar',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'student',
        major: this.major[4]._id,
        activated: true
      },

      // Admins
      {
        email: 'waelben7@gmail.com',
        firstName: 'Wael',
        lastName: 'Ben Taleb',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'admin',
        major: this.major[3]._id,
        activated: true
      },
      {
        email: 'sofien.msddak@gmail.com',
        firstName: 'Sofien',
        lastName: 'Msaddak',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'admin',
        major: this.major[4]._id,
        activated: true
      },
      {
        email: 'bassem.karbia.dev@gmail.com',
        firstName: 'Bassem',
        lastName: 'Karbia',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'admin',
        major: this.major[3]._id,
        activated: true
      },
      {
        email: 'medazizbouchrit@gmail.com',
        firstName: 'Azzi',
        lastName: 'Bouchrit',
        hashedPassword: '$2b$10$.ORz5/1guqRdR5eC9cXy1eWoUyKCuNwvqfsShGUlVfR.X0c27k6h.',
        type: 'admin',
        major: this.major[3]._id,
        activated: true
      }
    ]
  }
}

export default UsersSeeder
