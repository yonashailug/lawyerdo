const { Router } = require('express')

const auth = require('./routes/auth')
const upload = require('./routes/upload')
const course = require('./routes/course')

module.exports = () => {

    const app = Router()

    auth(app)
    upload(app)
    course(app)

    return app
}
