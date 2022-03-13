const mongoose = require('mongoose')

const Room = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please enter room name'],
      index: true
    },
    description: {
      type: String,
      default: ''
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the actual user model
    },
    members: {
      type: Array,
      default: []
    },
    photo: {
      type: String,
      default: ''
    },
    membersProfile: Object,
  },
  { timestamps: true })

module.exports = mongoose.model('Room', Room)
