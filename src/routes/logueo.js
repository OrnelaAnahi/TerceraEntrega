const { Router } = require('express')
const router = Router()
const passport = require('passport')
// const { generarToken, auth } = require('../jwt/jwt.js')
// const User = require('../models/user')

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', passport.authenticate('register', {
  successRedirect: '/inicio',
  failureRedirect: '/register',
}))

router.get('/inicio', isAuth, (req, res) => {
  res.render('inicio')
})


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
}))

router.get('/logout', (req, res) => {
  req.session.destroy(
    () => {
      res.redirect('/login')
    }
  )
})



module.exports = router