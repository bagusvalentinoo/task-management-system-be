require('module-alias/register')
const { convertToFormatDateTime } = require('@helpers/string/convert')

class TaskForMemberResource {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.status = data.status
    this.priority = data.priority
    this.due_date = data.due_date
    this.due_date_formatted = convertToFormatDateTime(data.due_date)
    this.created_at = data.created_at
    this.created_at_formatted = convertToFormatDateTime(data.created_at)
    this.category = data.category ? data.category.name : null
  }
}

module.exports = TaskForMemberResource