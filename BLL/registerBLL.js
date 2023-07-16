const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUser = require('../models/authUserModel');
const Permission = require('../models/permissionModel');

const registerUser = async (username, password, firstName, lastName) => {
  try {
    const existingUser = await AuthUser.findOne({ username });
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,}$/
      )
    ) {
      throw new Error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. White spaces are not allowed.'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthUser({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();

    //Create default permissions for new user:
    const defaultPermissions = new Permission({
      authUserId: savedUser._id,
      permissions: ['viewMovies'],
    });

    await defaultPermissions.save();

    // Generate token
    const token = jwt.sign(
      {
        id: savedUser._id,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        permissions: defaultPermissions.permissions,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    return {
      token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = registerUser;
