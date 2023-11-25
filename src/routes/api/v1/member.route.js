require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const { isMember } = require('@middlewares/role.middleware')
const TaskController = require('@controllers/user/member/product/task.controller')

router.get('/tasks', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.index(req, res)
})

router.post('/tasks', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.store(req, res)
})

router.get('/tasks/:id', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.show(req, res)
})

router.put('/tasks/:id', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.update(req, res)
})

router.delete('/tasks/:id', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.destroySingle(req, res)
})

router.delete('/tasks', ApiKey, Auth, isMember, async (req, res) => {
  await TaskController.destroyBulk(req, res)
})

module.exports = router