const mongoose = require('mongoose');
const AuthUser = require('./authUserModel');

const permissionSchema = new mongoose.Schema(
  {
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuthUser',
    },
    permissions: {
      type: [String],
      enum: [
        'viewMovies',
        'createMovie',
        'updateMovie',
        'deleteMovie',
        'viewSubscriptions',
        'createSubscription',
        'updateSubscription',
        'deleteSubscription',
        // 'admin',
      ],
    },
  },
  { versionKey: false }
);

const Permission = mongoose.model('permission', permissionSchema);

module.exports = Permission;
