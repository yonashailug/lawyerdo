const jwt = require('express-jwt')

const config = require('../../config')

const getTokenFromHeader = req => {

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

module.exports = jwt({
  secret: config.jwt,
  algorithms: [config.jwtAlgorithm],
  userProperty: 'userInfo',
  getToken: getTokenFromHeader,
})
