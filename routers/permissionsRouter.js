const express = require('express')
const permissionsBLL = require('../BLL/permissionsBLL')

const permissionsRouter = express.Router()

//Entry Point 'http://localhost:8001/permissions'

permissionsRouter.route('/').get(async (req, res) => {
  try {
    const permissions = await permissionsBLL.getAllPermissions()
    res.json(permissions)
  } catch (error) {
    res.json({ error:  error.message })
  }
})

permissionsRouter.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params
    const permission = await permissionsBLL.getPermissionById(id)
    res.json(permission)
  } catch (error) {
    res.json({ error:  error.message })
  }
})

permissionsRouter.route('/').post(async (req, res) => {
  try {
    const obj = req.body
    const result = await permissionsBLL.addPermission(obj)
    res.json(result)
  } catch (error) {
    res.json({ error:  error.message })
  }
})

permissionsRouter.route('/:id').patch(async (req, res) => {
  try {
    const { id } = req.params
    const obj = req.body
    const result = await permissionsBLL.updatePermission(id, obj)
    res.json(result)
  } catch (error) {
    res.json({ error:  error.message })
  }
})

permissionsRouter.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params
    const result = await permissionsBLL.deletePermission(id)
    res.json(result)
  } catch (error) {
    res.json({ error:  error.message })
  }
})

module.exports = permissionsRouter
