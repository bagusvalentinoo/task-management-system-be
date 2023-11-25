const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      // BelongsTo Relationships
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      })
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: 'Oops! Task title is already exist'
        },
        validate: {
          notNull: {
            msg: 'Oops! Task title cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Task title cannot be empty'
          },
          len: {
            args: [0, 100],
            msg: 'Oops! Task title cannot be more than 100 characters'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 1000],
            msg: 'Oops! Task description cannot be more than 1000 characters'
          }
        }
      },
      status: {
        type: DataTypes.ENUM('None', 'In Progress', 'Done'),
        allowNull: false,
        defaultValue: 'None',
        validate: {
          notNull: {
            msg: 'Oops! Task status cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Task status cannot be empty'
          },
          isIn: {
            args: [['None', 'In Progress', 'Done']],
            msg: 'Oops! Task status must be None, In Progress, or Done'
          }
        }
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low',
        validate: {
          notNull: {
            msg: 'Oops! Task priority cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Task priority cannot be empty'
          },
          isIn: {
            args: [['Low', 'Medium', 'High']],
            msg: 'Oops! Task priority must be Low, Medium, or High'
          }
        }
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Task due date cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Task due date cannot be empty'
          },
          isDate: {
            args: true,
            msg: 'Oops! Task due date must be a date'
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
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Task
}