const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter password']
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
      unique: true
    },
  },
  { timestamps: true })

module.exports = mongoose.model('User', User)
