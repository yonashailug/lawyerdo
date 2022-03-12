const { Router } = require('express')

const authService = require('../../services/auth')

const route = Router()

module.exports = (app) => {

  app.use('/users', route)

  route.post('/login', async(req, res, next) => {

    try {

      const { email, password } = req.body
      const { user, token } = await authService.signin({ email, password })
      return res.status(200).json({ user, token })

    } catch(e) {
      return next(e)
    }
  })

  route.post('/signup', async(req, res, next) => {

    try {

      const { user, token } = await authService.signup(req.body)
      return res.status(201).json({ user, token })

    } catch(e) {
      return next(e)
    }
  })

  route.get('/verify', async(req, res, next) => {

    try {

      const { email } = req.query
      const exists = await authService.verify({ email })
      return res.status(200).json({ success: true, data: { exists } })
      
    } catch(e) {
      return next(e)
    }
  })
}
