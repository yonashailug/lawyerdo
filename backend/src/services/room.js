const roomModel = require('../models/room')
const userService = require('../services/user')

module.exports = {
    allRooms: () => roomModel.find(),
    createRoom: async({ userId }) => {

        const { name } = await userService.getById(userId)

        try {

            const requestData = {
                name,
                user: { 
                    id: userId,
                    name
                },
            }

            const { data } = await makeRequest('rooms', requestData)

            const room = {
                roomId: data.room.id,
                name,
                userId: userId,
                members: [userId],
            }

            return await this.roomsService.create(room)

        } catch(error) {

            if (!error.response)
                throw new InternalServerErrorException({
                    errors: 'Something went wrong, try again later.',
                })

            throw new HttpException({
                errors: error.response.data.error
            }, error.response.status)
        }

    },
    getRoomById: (id) => roomModel.findById(id),
    deleteRoomById: (id) => roomModel.deleteOne({ _id: id })
}
