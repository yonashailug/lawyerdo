const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('../api')
const config = require('../config')

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' })

if (!fs.existsSync(config.path.upload.images)) {
    fs.mkdirSync(config.path.upload.images, { recursive: true });
}

module.exports = (app) => {

    // Health check
    app.get('/status', (req, res) => {
        res.status(200).end()
    })

    app.use(cors())

    app.use(morgan('combined', { stream: accessLogStream }))

    app.use('/pictures', express.static(config.path.upload.images))

    app.use(express.json())

    app.use(config.api.prefix, routes())

    app.use((err, req, res, next) => {
        // handle 401 and others
        console.log(err)
        return next(err)
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message
            }
        })
    })
}
