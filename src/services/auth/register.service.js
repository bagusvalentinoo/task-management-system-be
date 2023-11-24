require('module-alias/register')
const bcrypt = require('bcrypt')
const response = require('@helpers/http/response')
const { User } = require('@models')
require('dotenv').config()

const createNewUserMember = async (req, t) => {
  const {
    name,
    username,
    email,
    password,
    password_confirmation
  } = req.body

  if (password !== password_confirmation)
    response.throwNewError(400, 'Oops! Password and Password Confirmation didn\'t match')

  const user = await User.create({
    name,
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
  await user.assignRole('Member', t)
  await user.createMember({
    avatar_url: process.env.DEFAULT_AVATAR_URL,
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })

  return user
}

module.exports = { createNewUserMember }