const express = require('express')
require('./src/db/dbMongo.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('./src/passport/local.js')


const logueo = require('./src/routes/logueo.js')

const app = express()

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'secret',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 600000
  },
  store: MongoStore.create({ mongoUrl: "mongodb+srv://ornelaAnahi:1221322343@cluster0.unl79bb.mongodb.net/sessionMongo?retryWrites=true&w=majority" })
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './src/views')


app.use('/', logueo)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})