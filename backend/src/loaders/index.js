const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async(app) => {
    const mongoConnection = await mongooseLoader();
    expressLoader(app)
}