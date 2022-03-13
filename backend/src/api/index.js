const { Router } = require('express')

const auth = require('./routes/auth')
const upload = require('./routes/upload')
const room = require('./routes/room')

module.exports = () => {

    const app = Router()

    auth(app)
    upload(app)
    room(app)

    return app
}
