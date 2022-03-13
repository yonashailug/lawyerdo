const roomModel = require('../models/room')

module.exports = {
    allRooms: () => roomModel.find(),
    addRoom: (data) => roomModel.create(data),
    getRoomById: (id) => roomModel.findById(id),
    deleteRoomById: (id) => roomModel.deleteOne({ _id: id })
}
