const express = require('express')
const authUsersBLL = require('../BLL/authUsersBLL')

const authUsersRouter = express.Router()

//Entry Point 'http://localhost:8001/authUsers'

authUsersRouter.route('/').get(async (req, res) => {
    try {
        const authUsers = await authUsersBLL.getAllAuthUsers()
      res.json(authUsers)
    } catch (error) {
      res.json({ error:  error.message })
    }
  })
  
  authUsersRouter.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params
      const authUser = await authUsersBLL.getAuthUserById(id)
      res.json(authUser)
    } catch (error) {
      res.json({ error:  error.message })
    }
  })
  
  authUsersRouter.route('/').post(async (req, res) => {
    try {
      const obj = req.body
      const result = await authUsersBLL.addAuthUser(obj)
      res.json(result)
    } catch (error) {
      res.json({ error:  error.message })
    }
  })
  
  authUsersRouter.route('/:id').patch(async (req, res) => {
    try {
      const { id } = req.params
      const obj = req.body
      const result = await authUsersBLL.updateAuthUser(id, obj)
      res.json(result)
    } catch (error) {
      res.json({ error:  error.message })
    }
  })
  
  authUsersRouter.route('/:id').delete(async (req, res) => {
    try {
      const { id } = req.params
      const result = await authUsersBLL.deleteAuthUser(id)
      res.json(result)
    } catch (error) {
      res.json({ error:  error.message })
    }
  })
  
  module.exports = authUsersRouter
  