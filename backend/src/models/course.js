const mongoose = require('mongoose')

const Course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a course name'],
      index: true,
    },

    code: {
      type: String,
      uppercase: true,
    },
  },
  { timestamps: true })

module.exports = mongoose.model('Course', Course)
