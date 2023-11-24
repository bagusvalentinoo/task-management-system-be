class MemberForRegisterResource {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.username = data.username
    this.email = data.email
    this.gender = data.member ? data.member.gender : null
    this.address = data.member ? data.member.address : null
    this.birth_place = data.member ? data.member.birth_place : null
    this.birth_date = data.member ? data.member.birth_date : null
    this.avatar_url = data.member ? data.member.avatar_url : null
    this.roles = data.roles ? data.roles.map(role => role.name) : null
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = MemberForRegisterResource