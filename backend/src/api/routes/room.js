const { Router } = require('express')

const roomService = require('../../services/room')
const userService = require('../../services/user')
const { formatError } = require('../../utils')
const makeRequest = require('../../utils/request')

const { isAuthenticated, currentUser } = require('../middlewares')

const route = Router()

async function addMembersDetail(rooms) {
    for (let i = 0; i < rooms.length; i++) {
      const membersProfile = []
      for (let member of rooms[i].members) {
        const memberProfile = await userService.getById(member)
        if (memberProfile) membersProfile.push(memberProfile)
      }
      rooms[i].membersProfile = membersProfile
    }
    return rooms;
}

module.exports = (app) => {

    app.use('/rooms', route)

    // Mark - Get all rooms for a user
    route.get('', isAuthenticated, currentUser, async(req, res) => {

        const { userId } = req.user

        const rooms = await roomService
        .getAllPopulated({
            members: { $in: [userId] },
          })

        const populatedRooms = await addMembersDetail(rooms.slice())

        return res.status(200).json({
            data: populatedRooms
        })
    })
    
    // Mark - Get specific room by roomId
    route.get('/:roomId', isAuthenticated, currentUser, async(req, res) => {

        const { userId } = req.user
        const { roomId } = req.params

        const room = await roomService.getOne({ roomId })

        if (!room) return res.status(404).json({ errors: 'Room not found.' })
    
        if (room.userId != userId)
            return res.status(401).json({ errors: 'You are not allowed to perform this operation.' })

        return res.status(200).json({
            data: room
        })
    })

    // Mark: - create new room
    route.post('', isAuthenticated, currentUser, async(req, res) => {

        const { name } = req.body
        const { userId } = req.user 

        const user = await userService.getById(userId)

        try {

            const requestData = {
                name,
                user: { 
                    id: userId,
                    name: user.name
                },
            }

            // Mark: - Api request to the eyeson api
            const { data } = await makeRequest('rooms', requestData)

            const room = {
                roomId: data.room.id, // Mark: - From eyeson
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
                return res.status(500).json({ errors: 'Something went wrong, try again later.', })

            return res.status(error.response.status).json({ errors: error.response.data.error, })
        }
   
    })

    // Mark: Join room
    route.post(':roomId/join', isAuthenticated, currentUser, async(req, res) => {

        const { roomId } = req.params
        const { userId } = req.user
  
        const room = await roomService.getOne({ roomId })

        if (!room)
            throw new NotFoundException(formatError('roomId', 'Room not found.'))
    
        if (room.userId == userId || room.members.includes(userId))
            return res.status(200).json({ data: { joined: true, room } })
    
        const members = [...room.members, userId]

        const updated = await roomService.updateById(room._id, { members })

        return res.status(203).json({ data: updated })
  
    })

    // Mark: - Leave room
    route.post(':roomId/leave', isAuthenticated, currentUser, async(req, res) => {
  
        const { roomId } = req.params
        const { userId } = req.user

        const room = await roomService.getOne({
            roomId,
            userId: { $ne: userId },
        })

        if (!room) return res.status(404).json({ errors: 'Room not found.' })
    
        if (!room.members.includes(userId))
            return res.status(402).json({ errors: 'You are not member of this room.', })
    
        let members = room.members.filter(member => member != userId)
        const updated = await roomService.updateById(room._id, { members })
        
        return res.status(203).json({ data: updated })
    })

    // Mark: - Stop session
    route.post(':roomId/stop', isAuthenticated, currentUser, async(req, res) => {
  
        const { roomId } = req.params
        const { userId } = req.user
            
        const room = await roomService.getOne({ roomId })

        if (!room) return res.status(404).json({ errors: 'Room not found.' })
    
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
                return res.status(500).json({ errors: 'Something went wrong, try again later.', })

            return res.status(error.response.status).json({ errors: error.response.data.error, })
        }
    })

    // Mark: - Delete room
    route.delete('/:id', isAuthenticated, currentUser, async(req, res) => {
    
        const { roomId } = req.params
        const { userId } = req.user

        const room = await roomService.getOne({ roomId })

        if (!room) return res.status(404).json({ errors: 'Room not found.' })
    
        if (room.userId != userId)
            return res.status(402).json({ errors: 'You are not allowed to perform this operation.' })
    
        const deleted = await roomService.deleteOne({ roomId })

        return res.status(200).json({
            data: deleted
        })
    })
}
