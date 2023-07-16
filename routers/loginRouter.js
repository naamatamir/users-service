const express = require('express');
const loginUser = require('../BLL/loginBLL')

const loginRouter = express.Router();

//Entry Point 'http://localhost:8001/authUsers/login'

loginRouter.route('/').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    const userLoginData = await loginUser(username, password);

    res.status(201).json({
      message: 'Logged in successfully.',
      token: userLoginData.token,
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

module.exports = loginRouter;