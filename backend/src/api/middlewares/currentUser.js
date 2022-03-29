const userService = require('../../services/user')

module.exports = async (req, res, next) => {

  try {

    const userRecord = await userService.getById(req.userInfo.id)

    if (!userRecord)
      return res.status(401).json({
        errors: 'Unauthorized',
      })

    const user = userRecord.toObject()

    Reflect.deleteProperty(user, 'password')

    req.user = {
      userId: user._id.toString(), // Mark: - ObjectId to string
      name: user.name
    }

    return next()

  } catch(error) {
    
    return next(error)
  }
}
