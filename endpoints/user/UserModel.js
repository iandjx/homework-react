const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');

// User Schema
const UserSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdministrator: {
        type: Boolean,
        deafult: false,
    },
  
});

module.exports = mongoose.model('user', UserSchema);