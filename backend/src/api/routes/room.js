const { Router } = require('express')

const roomService = require('../../services/room')
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

    route.post('', isAuthenticated, async(req, res) => {

        const newRoom = await roomService.addRoom(req.body)

        if (newRoom == null) return res.json({}).status(400)

        return res.status(200).json({
            data: newRoom.insertedId
        })
    })

    route.delete('/:id', isAuthenticated, async(req, res) => {

        const deletedRoom = await roomService.deleteRoomById(req.params.id)

        if (deletedRoom == null) return res.json({}).status(400)

        return res.status(200).json({
            data: deletedRoom
        })
    })
}
