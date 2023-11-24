require('module-alias/register')
const { Role } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Role.bulkCreate([
      {
        name: 'Admin'
      },
      {
        name: 'Member'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
}
