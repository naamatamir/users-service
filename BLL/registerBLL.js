const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUser = require('../models/authUserModel');
const Permission = require('../models/permissionModel');

const registerUser = async (
  username,
  password,
  firstName,
  lastName,
  isAdmin = true,
  permissions = []
) => {
  try {
    const existingUser = await AuthUser.findOne({ username });

    if (existingUser) {
      throw { message: 'Username is already taken', statusCode: 409 };
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,}$/
      )
    ) {
      throw {
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. White spaces are not allowed.',
        statusCode: 400,
      };
    }

    const allPermissions = [
      'viewMovies',
      'createMovie',
      'updateMovie',
      'deleteMovie',
      'viewSubscriptions',
      'createSubscription',
      'updateSubscription',
      'deleteSubscription',
    ];

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthUser({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      permissions: isAdmin ? allPermissions : permissions,
    });

    const savedUser = await newUser.save();

    //Create  permissions for admin user:
    const adminPermissions = new Permission({
      authUserId: savedUser._id,
      permissions: isAdmin ? allPermissions : permissions,
    });

    await adminPermissions.save();

    // Generate token
    const token = jwt.sign(
      {
        id: savedUser._id,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        isAdmin: savedUser.isAdmin,
        permissions: allPermissions,
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
