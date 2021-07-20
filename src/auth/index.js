const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { loginValidate, loginValidationRules, registerValidationRules, registerValidate } = require('../validator')

const db = require('../models')
// const { logger } = require('../utils/pino-logger')

router.post('/register', registerValidationRules(), registerValidate, async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  passport.authenticate('register', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (info !== undefined) {
      return res.status(403).json({ auth: false, message: info.message })
    }

    req.logIn(user, async () => {
      let isuser
      let userdata

      try {
        isuser = await db.User.findOne({
          where: {
            email: user.email
          }
        })
      } catch (error) {
        return next(error)
      }

      try {
        userdata = await user.update({
          firstname: isuser.firstname,
          lastname: isuser.user,
          email: isuser.email
        })
      } catch (error) {
        return next(error)
      }

      const token = jwt.sign({
        id: userdata.id,
        name: userdata.firstname,
        email: userdata.email
      }, process.env.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
      })

      res.status(200).json({
        auth: true,
        token,
        message: 'user found & logged in'
      })
    })
  })(req, res, next)
})

router.post('/login', loginValidationRules(), loginValidate, (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  passport.authenticate('login', { session: false }, async (err, user, info) => {
    if (err) {
      console.error(`error ${err}`)
    }

    if (info.message === 'error_login') {
      res.status(401).json({ auth: false, status: info.message, info: 'user credential do not match in our record' })
    }

    if (info.message === 'passwords_do_not_match') {
      res.status(401).json({ auth: false, status: info.message, info: 'password do not match with our user record' })
    }

    if (user) {
      req.logIn(user, async () => {
        let userdata

        try {
          userdata = await db.User.findOne({
            where: {
              email: user.email
            }
          })
        } catch (error) {
          return next(error)
        }

        const token = jwt.sign({
          id: userdata.id,
          name: userdata.firstname,
          email: userdata.email
        }, process.env.JWT_SECRET, {
          expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
        })

        res.status(200).json({
          auth: true,
          token,
          message: 'user found & logged in'
        })
      })
    } else {
      return console.error('error')
    }
  })(req, res, next)
})

router.get('/userprofile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const { id } = req.query

  if (id === null && id !== req.user.id) {
    return res.status(422).json({ message: 'cannot find user by id' })
  }

  let userInfo

  try {
    userInfo = await db.User.findByPk(id)
  } catch (error) {
    return next(error)
  }

  if (userInfo.id !== req.user.id) {
    return res.status(422).json({ message: 'userID do not match' })
  }

  res.status(200).json({
    auth: true,
    id: userInfo.id,
    name: userInfo.firstname,
    email: userInfo.email
  })
})

module.exports = router
