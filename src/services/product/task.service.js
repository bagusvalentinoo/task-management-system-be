require('module-alias/register')
const response = require('@helpers/http/response')
const {
  convertToLowerCase,
  convertToUpperCase,
  convertToCapitalizedCase
} = require('@helpers/string/convert')
const { Op, Task, Category } = require('@models')
const TaskForListMemberCollection = require('@resources/product/task/task_for_list_member_collection')

const orderByCustom = (query) => {
  const { sort_by, sort_dir } = query
  const validSortDir = ['ASC', 'DESC']
  const normalizedSortDir = validSortDir.includes(convertToUpperCase(sort_dir ?? '')) ? convertToUpperCase(sort_dir) : 'DESC'

  return sort_by ? [[convertToLowerCase(sort_by), normalizedSortDir]] : [['created_at', 'DESC']]
}

const getTasks = async (req) => {
  const { user_id } = req
  const query = req.query
  const sortBy = orderByCustom(query)
  const { limit, offset } = response.pagination(query.page, query.limit)
  const { search, status, priority } = query

  const responsePayloadTask = {
    limit,
    offset,
    order: sortBy,
    subQuery: false,
    distinct: true,
    include: {
      model: Category,
      as: 'category',
      attributes: ['id', 'name']
    },
    where: { user_id }
  }

  if (search) {
    responsePayloadTask.where = {
      ...responsePayloadTask.where,
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ]
    }
  }

  const validPriority = ['Low', 'Medium', 'High']
  const validStatus = ['None', 'In Progress', 'Done']

  if (priority && validPriority.includes(priority)) {
    responsePayloadTask.where = {
      ...responsePayloadTask.where,
      priority
    }
  }

  if (status && validStatus.includes(status)) {
    responsePayloadTask.where = {
      ...responsePayloadTask.where,
      status
    }
  }

  const tasks = await Task.findAndCountAll(responsePayloadTask)

  return response.paginate(
    tasks,
    query.page,
    limit,
    'tasks',
    TaskForListMemberCollection.collection(tasks.rows, 1)
  )
}


const findTask = async (id) => {
  const task = await Task.findByPk(id)

  return task ? task : response.throwNewError(400, 'Oops! Task not found')
}

const createTask = async (req, t) => {
  const {
    title,
    description,
    status,
    priority,
    due_date,
    category_name
  } = req.body
  const { user_id } = req

  const category = await Category.findOrCreate({
    where: { name: convertToCapitalizedCase(category_name) },
    defaults: { name: convertToCapitalizedCase(category_name) },
    transaction: t
  })

  return await Task.create({
    title,
    description,
    status,
    priority,
    due_date,
    category_id: category[0].id,
    user_id
  }, { transaction: t })
}

const getTask = async (id) => {
  const task = await Task.findByPk(id, {
    include: {
      model: Category,
      as: 'category',
      attributes: ['id', 'name']
    }
  })

  return task ? task : response.throwNewError(400, 'Oops! Task not found')
}

const updateTask = async (req, task, t) => {
  const {
    title,
    description,
    status,
    priority,
    due_date,
    category_name
  } = req.body
  const { user_id } = req

  const category = await Category.findOrCreate({
    where: { name: convertToCapitalizedCase(category_name) },
    defaults: { name: convertToCapitalizedCase(category_name) },
    transaction: t
  })

  return await task.update({
    title: title ?? task.title,
    description: description ?? task.description,
    status: status ?? task.status,
    priority: priority ?? task.priority,
    due_date: due_date ?? task.due_date,
    category_id: category[0].id ?? task.category_id,
    user_id: user_id ?? task.user_id,
    updated_at: new Date()
  }, { transaction: t })
}

const deleteTask = async (task, t) => {
  return await task.destroy({ transaction: t })
}

const deleteTasks = async (ids, t) => {
  return await Task.destroy({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  }, { transaction: t })
}

module.exports = {
  getTasks,
  findTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteTasks
}