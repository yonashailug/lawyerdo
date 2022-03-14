const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const argon2 = require('argon2')

const userService = require('./user')
const config = require('../config')

function generateToken(user) {
  const today = new Date()
  const exp = new Date(today)

  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      id: user.id, // We are gonna use this in the middleware 'isAuth'
      role: user.role,
      name: user.name,
      exp: exp.getTime() / 1000,
    },
    config.jwt
  )
}

module.exports = {
  signup: async(data) => {

    try {

      const salt = randomBytes(32)

      const hashedPassword = await argon2.hash(data.password, { salt })

      const user = await userService.create({
        ...data,
        password: hashedPassword,
      })

      const token = generateToken(user)

      if (!user) {
        throw new Error('User cannot be created')
      }

      return { user, token }

    } catch(error) {
      throw error
    }
  },
  signin: async({ email, password }) => {

    const user = await userService.getOne({ email })
    if (!user) {
      throw new Error(`User doesn't exist.`)
    }

    // Mark: Prevent from 'timing based' attacks
    const validPassword = await argon2.verify(user.password, password)

    if (validPassword) {

      const token = generateToken(user)

      return { user, token }

    } else {
      throw new Error('Invalid Password')
    }
  },
  verify: async({ email }) => {

    const userRecord = await userService.getOne({ email })
    if (!userRecord) return false

    return true
  }
}
