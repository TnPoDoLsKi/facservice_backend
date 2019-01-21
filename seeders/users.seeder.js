import {
  Seeder
} from 'mongoose-data-seed'
import {
  User
} from '../src/config/models'

const data = [{
  email: 'mouna@gmail.com',
  firstName: 'Mouna',
  lastName: 'Ammar',
  hashedPassword: 'mouna123',
  type: 'student',
  avatar: '/uploads/avatar.jpg',
  major: '5c1fb346e28363333004f02c'
}, {
  email: 'chady@gmail.com',
  firstName: 'Chady',
  lastName: 'Mrad',
  hashedPassword: 'chady123',
  type: 'admin',
  avatar: '/uploads/avatar.jpg',
  major: '5c1fb346e28363333004f02c'
}, {
  email: 'rouis@gmail.com',
  firstName: 'Mohamed',
  lastName: 'Rouis',
  hashedPassword: 'rouis123',
  type: 'prof',
  avatar: '/uploads/avatar.jpg',
  major: '5c1fb346e28363333004f02c'
}]

class UsersSeeder extends Seeder {
  async shouldRun () {
    return User.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    console.log(data)
    return User.create(data)
  }
}

export default UsersSeeder
