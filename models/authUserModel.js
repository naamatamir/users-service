const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    //*? required
    lastName: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    sessionTimeout: Number,
  },
  { timestamps: true, versionKey: false }
);

const AuthUser = mongoose.model('authUser', authUserSchema, 'authUsers');

module.exports = AuthUser;
