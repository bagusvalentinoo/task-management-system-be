require('module-alias/register')
const { User, Task, Category } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user1 = await User.findOne({
      where: {
        username: 'darina_sidis',
        email: 'darinasidis@gmail.com'
      }
    })

    const user2 = await User.findOne({
      where: {
        username: 'warren_hui',
        email: 'wwarrenhui@gmail.com'
      }
    })

    const category1 = await Category.create({
      name: 'Work'
    })

    const category2 = await Category.create({
      name: 'School'
    })

    await Task.bulkCreate([
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject History',
        description: 'Quiz about subject history',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-11-28 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject Math',
        description: 'Quiz about subject math',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-11-29 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject English',
        description: 'Quiz about subject english',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-11-30 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject Science',
        description: 'Quiz about subject science',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject Biology',
        description: 'Quiz about subject biology',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-02 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user1.id,
        category_id: category2.id,
        title: 'Quiz Subject Chemistry',
        description: 'Quiz about subject chemistry',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-03 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      }
    ])

    await Task.bulkCreate([
      {
        user_id: user2.id,
        category_id: category1.id,
        title: 'Fix bug TSM-02-feature/slicing-login-page',
        description: 'Fix responsive bug on login page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user2.id,
        category_id: category1.id,
        title: 'Fix bug TSM-03-feature/slicing-register-page',
        description: 'Fix responsive bug on register page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user2.id,
        category_id: category1.id,
        title: 'Fix bug TSM-04-feature/slicing-home-page',
        description: 'Fix responsive bug on home page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user2.id,
        category_id: category1.id,
        title: 'Fix bug TSM-05-feature/slicing-task-page',
        description: 'Fix responsive bug on task page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user2.id,
        category_id: category2.id,
        title: 'Fix bug TSM-06-feature/slicing-profile-page',
        description: 'Fix responsive bug on profile page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      },
      {
        user_id: user2.id,
        category_id: category2.id,
        title: 'Fix bug TSM-07-feature/slicing-task-detail-page',
        description: 'Fix responsive bug on task detail page',
        status: 'None',
        priority: 'High',
        due_date: new Date('2023-12-01 23:59:59'),
        created_at: new Date('2023-11-20 06:00:00'),
        updated_at: new Date('2023-11-20 06:00:00')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {})
    await queryInterface.bulkDelete('categories', null, {})
  }
}
