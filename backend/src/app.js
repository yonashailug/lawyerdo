const express = require('express')

const { port } = require('./config')
const appLoader = require('./loaders')

async function startServer() {

    const app = express()

    appLoader(app)

    app.listen(port, () => console.log(`App running at ${port}`))

}

startServer()

