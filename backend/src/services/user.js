const userModel = require('../models/user')

module.exports  = {
  getById: (id) => userModel.findById(id),
  create: (data) => userModel.create(data),
  getOne: (filter) => userModel.findOne({ ...filter }),
}
