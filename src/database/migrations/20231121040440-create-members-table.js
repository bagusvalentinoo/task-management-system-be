/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      gender: {
        type: Sequelize.DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true
      },
      address: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      birth_place: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      birth_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true
      },
      avatar_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('members')
  }
}
