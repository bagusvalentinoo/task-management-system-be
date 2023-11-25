require('module-alias/register')
const response = require('@helpers/http/response')
const { sequelize } = require('@models')
const TaskService = require('@services/product/task.service')
const TaskForMemberResource = require('@resources/product/task/task_for_member_resource')

const index = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks(req)

    return response.success(
      res,
      200,
      'Data Successfully Retrieved',
      tasks
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const taskCreated = await TaskService.createTask(req, t)
    await t.commit()
    const task = await TaskService.getTask(taskCreated.id)

    return response.success(
      res,
      201,
      'Data Successfully Created',
      new TaskForMemberResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const show = async (req, res) => {
  try {
    const task = await TaskService.getTask(req.params.id)

    return response.success(
      res,
      200,
      'Data Successfully Retrieved',
      new TaskForMemberResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const update = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const findTask = await TaskService.findTask(req.params.id)
    const taskUpdated = await TaskService.updateTask(req, findTask, t)
    await t.commit()
    const task = await TaskService.getTask(taskUpdated.id)

    return response.success(
      res,
      200,
      'Data Successfully Updated',
      new TaskForMemberResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroySingle = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const task = await TaskService.findTask(req.params.id)
    await TaskService.deleteTask(task, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data Successfully Deleted'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroyBulk = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    await TaskService.deleteTasks(req.body.ids, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data Successfully Deleted'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroySingle,
  destroyBulk
}