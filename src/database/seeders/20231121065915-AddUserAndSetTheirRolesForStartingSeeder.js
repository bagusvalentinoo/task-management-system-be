require('module-alias/register')
const { User } = require('@models')
const bcrypt = require('bcrypt')
require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userAdmin = await User.create({
      name: 'Admin TMS',
      username: 'admin_tms',
      email: 'bagusvaalentino@gmail.com',
      password: bcrypt.hashSync('admin_tms', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userAdmin.assignRole('Admin')
    await userAdmin.createAdmin({
      gender: 'Male',
      avatar_url: process.env.DEFAULT_AVATAR_URL,
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember1 = await User.create({
      name: 'Darina Sidis',
      username: 'darina_sidis',
      email: 'darinasidis@gmail.com',
      password: bcrypt.hashSync('darina_sidis', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember1.assignRole('Member')
    await userMember1.createMember({
      gender: 'Female',
      avatar_url: process.env.DEFAULT_AVATAR_URL,
      address: 'Jl. Lorem Ipsum Dolor No.25',
      birth_place: 'Jakarta',
      birth_date: new Date('1999-12-17'),
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember2 = await User.create({
      name: 'Warren Hui',
      username: 'warren_hui',
      email: 'wwarrenhui@gmail.com',
      password: bcrypt.hashSync('warren_hui', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember2.assignRole('Member')
    await userMember2.createMember({
      gender: 'Male',
      avatar_url: process.env.DEFAULT_AVATAR_URL,
      address: 'Jl. Lorem Ipsum Dolor No.125',
      birth_place: 'Jakarta',
      birth_date: new Date('2001-08-12'),
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember3 = await User.create({
      name: 'Naura Ayu',
      username: 'naura_ayu',
      email: 'nnnauraayu@gmail.com',
      password: bcrypt.hashSync('naura_ayu', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember3.assignRole('Member')
    await userMember3.createMember({
      gender: 'Female',
      avatar_url: process.env.DEFAULT_AVATAR_URL,
      address: 'Jl. Lorem Ipsum Dolor No.12',
      birth_place: 'Bandung',
      birth_date: new Date('2005-05-05'),
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role', null, {})
    await queryInterface.bulkDelete('admins', null, {})
    await queryInterface.bulkDelete('members', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}
