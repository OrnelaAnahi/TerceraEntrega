const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


const nodemailer = require('nodemailer')

const email = 'nelladelugo@gmail.com'

async function mailNewUser(nombre, apellido, direccion, edad, telefono) {
  try {
    let htmlInfo = `
  <h1>DATOS DEL USUARIO</h1>
  <p>Nombre: ${nombre}</p>
  <p>Apellido: ${apellido}</p>
  <p>Direccion: ${direccion}</p>
  <p>Edad: ${edad}</p>
  <p>Telefono: ${telefono}</p>
  `
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: 'nelladelugo2@gmail.com',
        pass: 'usexwsqobxltwaxt'
      }
    })

    await transporter.sendMail({
      from: 'Todo para vos <nelladelugo2@gmail.com>',
      to: email,
      subject: 'Nuevo registro',
      html: htmlInfo,
    })
    console.log('Email enviado')
  } catch {
    res.status(500).send('Error al enviar el correo')
  }

}

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const usuarioDB = await User.findOne({ email })
  if (usuarioDB) {
    return done(null, false, { message: 'El correo ya esta registrado' })
  } else {
    const newUser = new User()
    newUser.name = req.body.name
    newUser.apellido = req.body.apellido
    newUser.direccion = req.body.direccion
    newUser.edad = req.body.edad
    newUser.telefono = req.body.telefono
    newUser.email = email
    newUser.password = password
    await newUser.save()

    await mailNewUser(newUser.name, newUser.apellido, newUser.direccion, newUser.edad, newUser.telefono)
    return done(null, newUser)


  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const usuarioDB = await User.findOne({ email })
  if (!usuarioDB) {
    return done(null, false, { message: 'El correo no esta registrado' })
  } else {
    if (password !== usuarioDB.password) {
      return done(null, false, { message: 'La contraseña no es correcta' })
    } else {
      return done(null, usuarioDB)
    }
  }
}
))

passport.serializeUser((usuario, done) => {
  done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
  const usuario = await User.findById(id)
  done(null, usuario)
})