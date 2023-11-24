require('module-alias/register')
const response = require('@helpers/http/response')
const RegisterService = require('@services/auth/register.service')
const LoginService = require('@services/auth/login.service')
const MemberService = require('@services/user/member.service')
const MemberForRegisterResource = require('@resources/user/member/member_for_register_resource')
const { sequelize } = require('@models')

const register = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const user = await RegisterService.createNewUserMember(req, t)
    const accessToken = await LoginService.generateAccessToken(user)
    const refreshToken = await LoginService.generateRefreshToken(user)
    await LoginService.insertAccessTokenAndRefreshToken(
      user,
      accessToken,
      refreshToken,
      t
    )
    await LoginService.updateLastLogin(user, t)
    await t.commit()
    const newUser = await MemberService.getUser(user.id)

    return response.success(
      res,
      201,
      'Register Successfully',
      {
        user: new MemberForRegisterResource(newUser),
        access_token: accessToken,
        refresh_token: refreshToken
      }
    )
  } catch (error) {
    if (t) await t.rollback()
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { register }