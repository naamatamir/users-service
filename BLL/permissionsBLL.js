const Permission = require('../models/permissionModel');

const getAllPermissions = () => {
  try {
    return Permission.find({});
  } catch (error) {
    throw error;
  }
};

const getPermissionById = (id) => {
  try {
    return Permission.findById({ _id: id });
  } catch (error) {
    throw error;
  }
};

const addPermission = async (obj) => {
  try {
    const newPermission = new Permission(obj);
    await newPermission.save();
    return 'created new permission';
  } catch (error) {
    throw error;
  }
};

const updatePermission = async (id, obj) => {
  try {
    await Permission.findByIdAndUpdate(id, obj);
    return `updated Permission for id ${id}`;
  } catch (error) {
    throw error;
  }
};

const deletePermission = async (id) => {
  try {
    await Permission.findByIdAndDelete(id);
    return `deleted permission of id ${id}`;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllPermissions,
  getPermissionById,
  addPermission,
  updatePermission,
  deletePermission,
};