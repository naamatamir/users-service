const AuthUser = require('../models/authUserModel');
const Permission = require('../models/permissionModel');

const getAllAuthUsers = () => {
  try {
    return AuthUser.find({});
  } catch (error) {
    throw error;
  }
};

const getAuthUserById = (id) => {
  try {
    return AuthUser.findById({ _id: id });
  } catch (error) {
    throw error;
  }
};

const addAuthUser = async (obj) => {
  try {
    const existingUser = await AuthUser.findOne({ username: obj.username });
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

     // If no password is provided, create a default one
     if (!obj.password) {
      obj.password = "defaultPassword";
    }
    
    const newAuthUser = new AuthUser(obj);
    const savedUser = await newAuthUser.save();

    //**Create default permissions for new user - if not required by admin: */
    const defaultPermissions = new Permission({
      authUserId: savedUser._id,
      permissions: ['viewMovies'],
    });

    await defaultPermissions.save();

    return 'created new AuthUser & default permmisions';
  } catch (error) {
    throw error;
  }
};

const updateAuthUser = async (id, obj) => {
  try {
    await AuthUser.findByIdAndUpdate(id, obj);
    return `updated AuthUser with id: ${id}`;
  } catch (error) {
    throw error;
  }
};

const deleteAuthUser = async (id) => {
  try {
    await AuthUser.findByIdAndDelete(id);
    return `deleted AuthUser with id: ${id}`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAuthUsers,
  getAuthUserById,
  addAuthUser,
  updateAuthUser,
  deleteAuthUser,
};
