const userModel = require('../../models/user')

module.exports = async (req, res, next) => {

  try {

    const userRecord = await userModel.findById(req.token._id)

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
