const roomModel = require('../models/room')

module.exports = {
    getAll: () => roomModel.find(),
    create: (data) => roomModel.create(data),
    getById: (id) => roomModel.findById(id),
    deleteById: (id) => roomModel.deleteOne({ _id: id }),
    deleteOne: ({ roomId }) => roomModel.deleteOne({ roomId }),
    getOne: ({ roomId }) => roomModel.findOne({ roomId }),
    updateById: (id, data) => roomModel.updateOne({ _id: id }, { ...data }),
    getAllPopulated: (filter) => roomModel.find(filter).populate('userId', '-password')
}
