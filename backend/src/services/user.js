const userModel = require('../models/user')

module.exports  = {
  getById: async(id) => await userModel.findById(id).select('-password')
}
