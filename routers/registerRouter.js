const express = require('express');
const registerUser = require('../BLL/registerBLL');

const registerRouter = express.Router();

//Entry Point 'http://localhost:8001/authUsers/register'

registerRouter.route('/').post(async (req, res) => {
  try {
    const { username, password, firstName, lastName, isAdmin } = req.body;

    const userRegisterData = await registerUser(username, password, firstName, lastName, isAdmin);

    res.status(201).json({
      message: 'Registered successfully.',
      token: userRegisterData.token,
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

module.exports = registerRouter;
