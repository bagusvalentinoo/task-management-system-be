const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // HasMany Relationship
      this.hasMany(models.Task, {
        foreignKey: 'category_id',
        as: 'tasks'
      })
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Category name cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Category name cannot be empty'
          },
          max: {
            args: 50,
            msg: 'Oops! Category name cannot be more than 50 characters'
          }
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Category
}