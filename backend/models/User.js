const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    // unique: true, // Removed unique constraint
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email remains unique
  },
  tel: {
    type: String,
    required: true,
    // tel is no longer unique by default
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
