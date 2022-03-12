const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const argon2 = require('argon2')

const userModel = require('../models/user')
const config = require('../config')

function generateToken(user) {
  const today = new Date()
  const exp = new Date(today)

  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      _id: user._id, // We are gonna use this in the middleware 'isAuth'
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

      const userRecord = await userModel.create({
        ...data,
        password: hashedPassword,
      })

      const token = generateToken(userRecord)

      if (!userRecord) {
        throw new Error('User cannot be created')
      }

      const user = userRecord.toObject()
      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')

      return { user, token }

    } catch(e) {
      throw e
    }
  },
  signin: async({ email, password }) => {

    const userRecord = await userModel.findOne({ email })
    if (!userRecord) {
      throw new Error(`User doesn't exist.`)
    }

    // Mark: Prevent from 'timing based' attacks
    const validPassword = await argon2.verify(userRecord.password, password)

    if (validPassword) {

      const token = generateToken(userRecord)

      const user = userRecord.toObject()

      Reflect.deleteProperty(user, 'password')
      Reflect.deleteProperty(user, 'salt')

      return { user, token }

    } else {
      throw new Error('Invalid Password')
    }
  },
  verify: async({ email }) => {

    const userRecord = await userModel.findOne({ email })
    if (!userRecord) return false

    return true
  }
}
