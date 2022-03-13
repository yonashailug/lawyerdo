const { Router } = require('express')

const roomService = require('../../services/room')
const userService = require('../../services/user')
const { formatError } = require('../../utils')
const makeRequest = require('../../utils/request')

const { isAuthenticated } = require('../middlewares')

const route = Router()

module.exports = (app) => {

    app.use('/rooms', route)

    route.get('', isAuthenticated, async(req, res) => {

        const allRooms = await roomService.allRooms()

        return res.status(200).json({
            data: allRooms
        })
    })
    
    route.get('/:id', isAuthenticated, async(req, res) => {
        
        const room = await roomService.getRoomById(req.params.id)

        if (room == null) return res.json({}).status(404)

        return res.status(200).json({
            data: room
        })
    })

    // Mark: - create new room
    route.post('', isAuthenticated, async(req, res) => {

        const { userId } = req.body

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

            const created = await roomService.create(room)

            return res.status(200).json({
                data: created
            })


        } catch(error) {

            if (!error.response)
                throw new InternalServerErrorException({
                    errors: 'Something went wrong, try again later.',
                })

            throw new HttpException({
                errors: error.response.data.error
            }, error.response.status)
        }
   
    })

    // Mark: Join room
    route.post(':roomId/join', isAuthenticated, async(req, res) => {

        const { roomId } = req.body
  
        const room = await roomService.getOne({ roomId })

        if (!room)
            throw new NotFoundException(formatError('roomId', 'Room not found.'))
    
        if (room.userId == userId || room.members.includes(userId))
            return { joined: true, room }
    
        const members = [...room.members, userId]

        const updated = await roomService.updateById(room._id, { members })

        return res.status(203).json({ data: updated })
  
    })

    // Mark: - Leave room
    route.post(':roomId/leave', isAuthenticated, async(req, res) => {
  
        const { roomId } = req.body

        const room = await roomService.getOne({
            roomId,
            userId: { $ne: userId },
        })

        if (!room)
            throw new NotFoundException(formatError('roomId', 'Room not found.'))
            
    
        if (!room.members.includes(userId))
            throw new BadRequestException({
                errors: 'You are not member of this room.',
            })
    
        let members = room.members.filter(member => member != userId)
        return await this.roomsService.updateById(room._id, { members })
  
    })

    // Mark: - Stop session
    route.post(':roomId/stop', isAuthenticated, async(req, res) => {
  
        const { roomId } = req.body
            
        const room = await roomService.getOne({ roomId })

        if (!room) throw new NotFoundException({ errors: 'Room not found.' });
    
        if (room.userId != userId)
            //a user who do not own the room should not be let stop the meeting
            return {
                own: false,
                message: 'You are not allowed to perform this operation.',
            }
    
        try {

            await makeRequest(`rooms/${roomId}`, {}, 'DELETE')
            // TODO: - remove from redis
            // await JoinedUsers.removeAll(roomId)

            return res.status(200).json({
                data: {
                    own: true,
                    message: 'The meeting has stopped successfully.'
                }
            })

        } catch (error) {

            if (!error.response)
                throw new InternalServerErrorException({
                    errors: 'Something went wrong, try again later.',
                })
    
            throw new HttpException({
                errors: error.response.data.error },
                error.response.status)
        }
    })

    route.delete('/:id', isAuthenticated, async(req, res) => {

        const deletedRoom = await roomService.deleteRoomById(req.params.id)

        if (deletedRoom == null) return res.json({}).status(400)

        return res.status(200).json({
            data: deletedRoom
        })
    })
}
