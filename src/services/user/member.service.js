require('module-alias/register')
const response = require('@helpers/http/response')
const { User, Role, Member } = require('@models')

const getUser = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Role,
        through: { attributes: [] },
        as: 'roles',
        attributes: ['name']
      },
      {
        model: Member,
        as: 'member'
      }
    ]
  })

  return user ? user : response.throwNewError(400, 'Oops! User not found')
}

module.exports = { getUser }