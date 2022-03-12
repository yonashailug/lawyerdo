const mongoose = require('mongoose')

const config = require('../config')

module.exports = async () => {
    const connection = await mongoose.connect(config.databaseURL)
    return connection.connection.db
}