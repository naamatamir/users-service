const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUser = require('../models/authUserModel');
const Permission = require('../models/permissionModel');

const loginUser = async (username, password) => {
  try {
    const user = await AuthUser.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid username or password');
    }

    const permissions = await Permission.findOne({ authUserId: user._id });
    if (!permissions) {
      throw new Error('No permissions found for this user.');
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        permissions: permissions.permissions,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3h' } 
    );
    return {
      token,
    };
  } catch (error) {
    console.error('Error in loginUser function:', error);
    throw error;
  }
};

module.exports = loginUser;
