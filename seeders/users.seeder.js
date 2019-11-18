import {
  Seeder
} from 'mongoose-data-seed'
import {
  User, Major
} from '../src/config/models'

class UsersSeeder extends Seeder {
  async beforeRun () {
    this.major = await Major.find().exec()
    this.users = this._generateUsers()
  }

  async shouldRun () {
    return User.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return User.create(this.users)
  }

  _generateUsers () {
    return [{
      email: 'mouna@gmail.com',
      firstName: 'Mouna',
      lastName: 'Ammar',
      hashedPassword: 'mouna123',
      type: 'student',
      avatar: '/uploads/avatar.jpg',
      major: this.major[0]._id
    }, {
      email: 'chady@gmail.com',
      firstName: 'Chady',
      lastName: 'Mrad',
      hashedPassword: 'chady123',
      type: 'admin',
      avatar: '/uploads/avatar.jpg',
      major: this.major[1]._id
    }, {
      email: 'rouis@gmail.com',
      firstName: 'Mohamed',
      lastName: 'Rouis',
      hashedPassword: 'rouis123',
      type: 'admin',
      avatar: '/uploads/avatar.jpg',
      major: this.major[0]._id
    }]
  }
}

export default UsersSeeder
